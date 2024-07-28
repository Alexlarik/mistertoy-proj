import { useEffect, useState, useRef } from 'react'
import { utilService } from '../src/services/util.service'
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'



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
        <Box className="toy-filter-full-main-layout" sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                Filter:
            </Typography>
            <form>
                <FormControl fullWidth sx={{ mb: 2, backgroundColor: 'white' }}>
                    <TextField
                        label="Name"
                        id="name"
                        name="txt"
                        placeholder="By Name"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'white' }}>
                    <InputLabel id="inStock-label">In Stock</InputLabel>
                    <Select
                        labelId="inStock-label"
                        id="inStock"
                        name="inStock"
                        value={filterByToEdit.inStock === true ? 'true' : filterByToEdit.inStock === false ? 'false' : ''}
                        onChange={handleChange}
                        label="In Stock"
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        <MenuItem value="true">In Stock</MenuItem>
                        <MenuItem value="false">Out of Stock</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </Box>
    )
}