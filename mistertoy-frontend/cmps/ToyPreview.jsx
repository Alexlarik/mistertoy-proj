
export function ToyPreview({ toys }) {

    function randomSymbol() {
        var arrEmoji = ['🧸', '🔫', '🪀']
        const randomIndex = Math.floor(Math.random() * arrEmoji.length)
        return arrEmoji[randomIndex]
    }
    var symbol = randomSymbol()
    return (
        <div>
            <h1>{toys}</h1>
            <h1>{symbol}</h1>
        </div>
    )
}