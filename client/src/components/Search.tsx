interface SearchInputProps {
    value: string
    onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className='m-4'>
            <input
                type='text'
                className='search'
                placeholder='Search for a movie...'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

// const Search = () => {
//     const navigate = useNavigate()

//     const [searchInput, setSearchInput] = useState('')

//     const handleChange = (e: { target: any; }) => {
//         const value = e.target.value

//         return setSearchInput(value)
//     }

//     const handleSubmit = (e: { preventDefault: () => void }) => {
//         e.preventDefault()

//         return navigate('/Movies')
//     }

//     return (
//         <form id='searchform'>
//             <input
//                 type='text'
//                 name='search'
//                 placeholder='Search'
//                 onChange={handleChange}
//                 value={searchInput}
//             />
//             <button type='submit' onSubmit={handleSubmit}>Search</button>
//         </form>
//     )
// }

// export default Search