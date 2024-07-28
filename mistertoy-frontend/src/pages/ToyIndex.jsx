import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service'
// import { toyService } from '../services/toy.service.local.js'
import { removeToy, saveToy } from '../store/toy.actions'
import { ToyList } from '../../cmps/ToyList.jsx'
import { ToyFilter } from '../../cmps/ToyFilter.jsx'
import { SET_FILTER_BY } from '../store/toy.reducer.js'
import { Button } from '@mui/material'
import toy from '../assets/toy.jpg'

export function ToyIndex() {
    // console.log('test')
    const toys = useSelector(state => state.x.toys)
    const filterBy = useSelector(state => state.x.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function setFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }

    function onAddToy() {
        const toysToSave = toyService.getToy()
        saveToy(toysToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    return (
        <main className="toy-app-layout">
            <h1 className='colored-text'>
                <span style={{ color: '#FF2626' }}>T</span>
                <span style={{ color: '#252A34' }}>o</span>
                <span style={{ color: '#723582' }}>y</span>
                <span style={{ margin: '0 0.1em' }}></span>
                <span style={{ color: '#FFD523' }}>A</span>
                <span style={{ color: '#71EFA3' }}>p</span>
                <span style={{ color: '#0F52BA' }}>p</span>
            <img src={toy} alt="image-toy" className="toy-image" />
            </h1>
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <main>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onAddToy}>Add Toy:🧸🔫🪀</Button>
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            </main>
            <footer>
                @cofferights
                <p>Lorem ipsum dolor sit amet</p>
            </footer>
        </main>
    )
}

{/* <Button variant="contained" color="primary" sx={{ mt: 2 }}>
Learn More
</Button> */}
