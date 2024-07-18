import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <section className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink>
            </nav>
        </section>
    )
}
