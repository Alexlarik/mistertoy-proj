import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'

// import { AppFooter } from './cmps/AppFooter.jsx'
// import { Home } from './pages/Home.jsx'
// import { BugDetails } from './pages/BugDetails.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <AppHeader />
                    <main>
                        <Routes>
                            {/* <Route path="/" element={<Home />} /> */}
                            <Route element={<ToyIndex />} path="/toy" />
                            {/* <Route path="/bug/:bugId" element={<BugDetails />} />
                        <Route path="/about" element={<AboutUs />} /> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </div>
            </Router>
        </Provider>
    )
}