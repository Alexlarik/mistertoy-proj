import { storageService } from '../async-storage.service.js'
import { toyService } from '../toyService.js'
import { userService } from '../user.service.js'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	return storageService.query('review')
}

async function remove(reviewId) {
	await storageService.remove('review', reviewId)
}

async function add({ txt, aboutToyId }) {
	const aboutToy = await toyService.getById(aboutToyId)
	const reviewToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutToy: {
			_id: aboutToy._id,
			name: aboutToy.name,
		},
	}

	reviewToAdd.byUser.score += 10
	await userService.update(reviewToAdd.byUser)

	const addedReview = await storageService.post('review', reviewToAdd)
	return addedReview
}