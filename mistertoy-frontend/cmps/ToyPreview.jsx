import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'

export function ToyPreview({ toy }) {
    // const toys = useSelector(state => state.x.toys)
    // console.log(toys)
    function randomSymbol() {
        var arrEmoji = ['🧸', '🔫', '🪀']
        const randomIndex = Math.floor(Math.random() * arrEmoji.length)
        return arrEmoji[randomIndex]
    }
    var symbol = randomSymbol()
    return (
        <div>
            {/* <h1>{toys}</h1> */}
            <Link to={`/toy/${toy._id}`}>
                <Paper elevation={6}>
                    <article style={{ listStyle: 'none' }} className="toy-preview">
                        <h1>{symbol}</h1>
                        <p className="toy-name">Name: {toy.txt}</p>
                        <p>Price: ${toy.price}</p>
                        <p>
                            {toy.inStock ? 'In stock' : 'Not in stock'}
                        </p>
                        <p>Label: {toy.label}</p>
                    </article>
                </Paper>
            </Link>
        </div>
    )
}