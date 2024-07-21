import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'

import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<About />} path="/about" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </div>
            </Router>
        </Provider>
    )
}