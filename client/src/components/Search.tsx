import { useState } from 'react';

const Search = () => {
    const [searchInput, setSearchInput] = useState('')

    const handleChange = (e: { target: any; }) => {
        const value = e.target.value     
           
        return setSearchInput(value)
    }

    return (
        <input
        type='text'
        name='search'
        placeholder='Search'
        onChange={handleChange}
        value={searchInput}
        />
    )
}

export default Search