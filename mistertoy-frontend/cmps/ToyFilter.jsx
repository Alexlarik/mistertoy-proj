import { useEffect, useState, useRef } from 'react'
import { utilService } from '../src/services/util.service'

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilterBy, 300))

    useEffect(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, option => option.value || [])
        }
        value = (type === 'number') ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter-full-main-layout">
            <h3>Toys Filter</h3>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="txt"
                    placeholder="By Name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock === true ? 'true' : filterByToEdit.inStock === false ? 'false' : ''}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </form>
        </section>
    )
}