import { NavLink } from 'react-router-dom'
import { Paper } from '@mui/material'

export function AppHeader() {
    return (
        <Paper elevation={12}>
            <section className="app-header">
                <nav>
                    <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> | <NavLink to="/about">About </NavLink> | <NavLink to="/dashboard">Dashboard </NavLink>
                </nav>
            </section>
        </Paper>
    )
}
