import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'


export function ToyDetails() {
    const toys = useSelector(state => state.x.toys)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then(toy => {
                console.log('Loaded toy:', toy)
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toys) return <Loader />

    return (
        <section className="toy-details" style={{ textAlign: 'center' }}>
            <h1>
                Toy name: <span>{toys.txt}</span>
            </h1>
            <h1>
                Toy price: <span>${toys.price}</span>
            </h1>
            <h1>
                {toys.inStock ? 'In stock' : 'Not in stock'}
            </h1>
            <button>
                <Link to="/toy">Back</Link>
            </button>
        </section>
    )
}