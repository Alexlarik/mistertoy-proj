import { NavLink, useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'
import { LoginSignup } from './LoginSignup.jsx'
import { useSelector } from 'react-redux'
import { UserMsg } from './UserMsg'
import { login, logout, signup } from '../src/store/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../src/services/event-bus.service.js'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.y.loggedinUser)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <Paper elevation={12}>
            <section className="app-header">
                <nav>
                    <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> | <NavLink to="/about">About </NavLink> | <NavLink to="/dashboard">Dashboard </NavLink>
                </nav>
                <nav>
                    {user && (
                        <section className="user-info">
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    )}
                    {!user && (
                        <section className="user-info">
                            <LoginSignup />
                        </section>
                    )}
                    <UserMsg />
                </nav>
            </section>
        </Paper>
    )
}
