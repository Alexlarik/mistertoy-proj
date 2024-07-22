import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <section className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> | <NavLink to="/about">About </NavLink> | <NavLink to="/dashboard">Dashboard </NavLink>
            </nav>
        </section>
    )
}
