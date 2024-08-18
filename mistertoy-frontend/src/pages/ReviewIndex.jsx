import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { ReviewEdit } from '../cmps/ReviewEdit.jsx'
import { addReview, loadReviews, removeReview } from '../store/review.actions.js'
import { loadToys } from '../store/toy.actions.js'

export function ReviewIndex() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews({})
        loadToys()
    }, [])

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

    return <div className="review-index">
        <h2>Reviews and Gossip</h2>
        <button onClick={onAddReview}>Add review</button>
        {loggedInUser && <ReviewEdit />} 
        <ReviewList
            reviews={reviews}
            onRemoveReview={onRemoveReview} />
    </div>
}