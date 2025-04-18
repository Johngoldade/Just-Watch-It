import { useState } from 'react'
import { User } from '../interfaces/User'
// import { retrieveUsers } from '../api/userAPI'
import { createUser } from '../api/createUser'

export default function SignUp() {
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: ''
    })

    // const [users, setUsers] = useState<User[]>([])
    const [ message, setMessage ] = useState<String>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!user.username){
                setMessage("Username is required to signup!")
                setTimeout(() => setMessage(''), 3000)
            }

            if (!user.email){
                setMessage("Email is required to signup!")
                setTimeout(() => setMessage(''), 3000)
            }

            if (!user.password){
                setMessage("Password is required to signup!")
                setTimeout(() => setMessage(''), 3000)
            }

            if (user.username && user.email && user.password) {
                const response = await createUser(user.username, user.email, user.password)
                console.log('Login successful:', response)
                setMessage("You have successfully signed up!")
                setTimeout(() => setMessage(''), 1500)
                setUser({ username: '', email: '', password: '' })
                setInterval(() => window.location.assign('/Login'), 1500)
            }
        } catch (error) {
            console.error('Login failed:', error)
            setMessage("Sign up failed. Please try again.")
            setTimeout(() => setMessage(''), 3000)
        }


    }
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await retrieveUsers()
    //             setUsers(response)
    //         } catch (error) {
    //             console.error('Error fetching users:', error)
    //         }
    //     }
    //     fetchUsers()
    // }, [])


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={user.username || ''}
                    onChange={handleChange}
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={user.email || ''}
                    onChange={handleChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={user.password || ''}
                    onChange={handleChange}
                />
            </form>
            <div>
                <button type='submit' onClick={handleSubmit} className='btn btn-outline-light'>Sign Up</button>
            </div>
            <h6>{message}</h6>
            {/* <div>
                <h2>Users</h2>
                {users.map((user) => (
                    <div key={user.id}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div> */}
        </div>
    )
}