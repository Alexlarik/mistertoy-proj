import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
            <h1>{symbol}</h1>
            <Link to={`/toy/${toy._id}`}>
                {/* <article className="toy-preview">
                    <h1 className="toy-name">{toy.name}</h1>
                    <h1>Price: ${toy.price}</h1>
                    <h1>
                        {toy.inStock ? 'In stock' : 'Not in stock'}
                    </h1>
                </article> */}
            </Link>
        </div>
    )
}