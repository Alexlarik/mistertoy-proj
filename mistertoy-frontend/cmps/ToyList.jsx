import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'

export function ToyList({ onRemoveToy }) {
    const toys = useSelector(state => state.x.toys)
    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section>
                        {/* <span>🔫</span> */}
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>

                    </section>
                </li>
            )}
        </ul>
    )
}