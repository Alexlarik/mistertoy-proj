import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb
// import { utilService } from './util.service.js'
import fs from 'fs'

export const toyService = {
  query,
  getById,
  remove,
  save,
  add,
  update,
  addToyMsg,
  removeToyMsg,
  getToy,
  getDefaultFilter,
}

async function query(filterBy = {}, sortBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    const toys = await collection.find(criteria).sort(sortBy).toArray()
    return toys
  } catch (err) {
    logger.error('cannot find toys', err)
    throw err
  }
}

async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    const toy = await collection.findOne({ _id: ObjectId.createFromHexString(toyId) })
    const reviews = await reviewService.query({ toyId })
    toy.reviews = reviews.map(review => {
      delete review.toyId
      delete review.toy
      return review
    })
    toy.createdAt = toy._id.getTimestamp()
    return toy
  } catch (err) {
    logger.error(`while finding toy ${toyId}`, err)
    throw err
  }
}

async function remove(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    await collection.deleteOne({ _id: ObjectId.createFromHexString(toyId) })
  } catch (err) {
    logger.error(`cannot remove toy ${toyId}`, err)
    throw err
  }
}

async function save(toy) {
  if (toy._id) {
    return update(toy)
  } else {
    return add(toy)
  }
}

async function add(toy) {
  try {
    if (!toy.txt) toy.txt = utilService.makeLorem(2)
    if (!toy.price) toy.price = utilService.getRandomIntInclusive(50, 300)
    if (!toy.laebl) toy.label = utilService.getRandomLabel()
    // if (!inStock) inStock = true || false

    const collection = await dbService.getCollection('toy')
    const { insertedId } = await collection.insertOne(toy)

    toy._id = insertedId
    return toy
  } catch (err) {
    logger.error('cannot insert toy', err)
    throw err
  }
}

async function update(toy) {
  try {
    const toyToSave = {
      name: toy.name,
      price: toy.price,
      labels: toy.labels,
      inStock: toy.inStock,
    }
    const collection = await dbService.getCollection('toy')
    await collection.updateOne({ _id: new ObjectId(toy._id) }, { $set: toyToSave })
    return toy
  } catch (err) {
    logger.error(`cannot update toy ${toy._id}`, err)
    throw err
  }
}

async function addToyMsg(toyId, msg) {
  try {
    msg.id = utilService.makeId()
    const collection = await dbService.getCollection('toy')
    await collection.updateOne({ _id: ObjectId.createFromHexString(toyId) }, { $push: { msgs: msg } })
    return msg
  } catch (err) {
    logger.error(`cannot add toy msg ${toyId}`, err)
    throw err
  }
}

async function removeToyMsg(toyId, msgId) {
  try {
    const collection = await dbService.getCollection('toy')
    await collection.updateOne({ _id: ObjectId.createFromHexString(toyId) }, { $pull: { msgs: { id: msgId } } })
    return msgId
  } catch (err) {
    logger.error(`cannot remove toy msg ${toyId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const { labels, txt, status } = filterBy
  const criteria = {}

  if (txt) {
    criteria.name = { $regex: txt, $options: 'i' }
  }

  if (labels && labels.length) {
    criteria.labels = { $in: labels }
  }

  if (status) {
    criteria.inStock = status === 'true' ? true : false
  }

  return criteria
}

function getToy() {
  return { name: '', price: '', inStock: '', labels: [] }
}

function getDefaultFilter() {
  return { txt: '', price: '', inStock: '' }
}