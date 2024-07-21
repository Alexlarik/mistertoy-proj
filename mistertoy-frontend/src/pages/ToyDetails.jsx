import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'


export function ToyDetails() {
    const toys = useSelector(state => state.x.toys)
    const { toyId } = useParams()
    const toy = toys.find(toy => toy._id === toyId)
    // const [toy, setToy] = useState(null)
    // const { toyId } = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     loadToy()
    // }, [toyId])

    // function loadToy() {
    //     toyService.get(toyId)
    //         .then(toy => setToy(toy))
    //         .catch(err => {
    //             console.log('Had issues in toy details', err)
    //             showErrorMsg('Cannot load toy')
    //             navigate('/toy')
    //         })
    // }

    // if (!toys) return <Loader />

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
        </section>
    )
}