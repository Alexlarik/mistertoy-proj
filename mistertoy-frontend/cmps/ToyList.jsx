import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'
import { Button } from '@mui/material'

export function ToyList({ onRemoveToy }) {
    const toys = useSelector(state => state.x.toys)
    return (
        <ul className="toys-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section>
                        {/* <span>🔫</span> */}
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => onRemoveToy(toy._id)}>Remove</Button>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}><Link to={`/toy/${toy._id} `} className="link-white">Details</Link></Button>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}><Link to={`/toy/edit/${toy._id}`} className="link-white">Edit</Link></Button>

                    </section>
                </li>
            )}
        </ul>
    )
}
{/* <Button variant="contained" color="primary" sx={{ mt: 2 }}>
Learn More
</Button> */}