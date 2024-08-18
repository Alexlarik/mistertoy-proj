import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import { loadToy, addToyMsg } from '../store/toy.actions.js'
import { addReview, loadReviews, removeReview } from '../store/review.actions.js'
// import { loadUsers } from '../store/user.actions'
import { ReviewList } from '../../cmps/ReviewList.jsx'


export function ToyDetails() {
    const toys = useSelector(state => state.x.toys)
    const { toyId } = useParams()
    const toy = toys.find(toy => toy._id === toyId)
    const reviews = useSelector(state => state.z.reviews)

    async function onAddReview() {
        const txt = prompt('add a review')
        const aboutToyId = prompt('enter a Toy id')
        try {
            const review = { txt, aboutToyId }
            const addedReview = await addReview(review)
            showSuccessMsg('Review added')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add')
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    async function onAddToyMsg(toyId) {
        try {
          await addToyMsg(toyId, 'bla bla ' + parseInt(Math.random() * 10))
          showSuccessMsg(`Toy msg added`)
        } catch (err) {
          showErrorMsg('Cannot add toy msg')
        }
      }

    return (
        <section className="toy-details" style={{ textAlign: 'center' }}>
            <ul>
                <li key={toy._id}>
                    <section>
                        <h1 className="toy-name">{toy.txt}</h1>
                        <h1>Price: ${toy.price}</h1>
                        <h1>{toy.inStock ? 'In stock' : 'Not in stock'}</h1>
                        <h1>Label: {toy.label}</h1>
                    </section>
                </li>
            </ul>
            <button>
                <Link to="/toy">Back</Link>
            </button>
            <button onClick={() => { onAddToyMsg(toy._id) }}>Add toy msg</button>
            <button onClick={onAddReview}>Add review</button>
            <ReviewList
                reviews={reviews}
                onRemoveReview={onRemoveReview} />
        </section>
    )
}