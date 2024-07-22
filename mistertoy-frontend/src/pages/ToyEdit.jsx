import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
// import { toyService } from '../services/toy.service.local'

export function ToyEdit() {
    const dispatch = useDispatch()
    const toys = useSelector(state => state.x.toys)
    const { toyId } = useParams()
    const navigate = useNavigate()

    const toy = toys.find(toy => toy._id === toyId)

    const [name, setName] = useState(toy ? toy.txt : '')
    const [price, setPrice] = useState(toy ? toy.price : '')
    const [inStock, setInStock] = useState(toy ? toy.inStock === 'inStock' : false)

    function handleSave() {
        const updatedToy = {
            ...toy,
            txt: name,
            price: +price,
            inStock: inStock ? 'inStock' : 'not'
        }

        toyService.save(updatedToy)
            .then(() => {
                showSuccessMsg('toy updated successfully')
                navigate(`/toy/${toy._id}`)
            })
            .catch(err => {
                console.log('had issues saving toy', err)
                showErrorMsg('cannot update toy')
            })
    }
    return (
        <section className="toy-edit" style={{ textAlign: 'center' }}>
            <h1>Edit Toy</h1>
            <h2>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </h2>
            <h2>
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </h2>
            <h2>
                <label htmlFor="inStock">In Stock:</label>
                <input
                    id="inStock"
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                />
            </h2>
            <button onClick={handleSave}>Save</button>
            <button>
                <Link to={`/toy/${toyId}`}>Back to Details</Link>
            </button>
        </section>
    )
}