import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../interfaces/User'
import { login } from '../api/authAPI'
// import { retrieveUsers } from '../api/userAPI'
import Auth from '../utils/auth'

export default function Login() {
    const [user, setUser] = useState<User>({
        id: null,
        username: null,
        email: null,
        password: null,
        favorites: null,
        primaryGroup: null,
    })

    // const [users, setUsers] = useState<User[]>([])
    const [ message, setMessage ] = useState<String>('')

    

        // Then, in any component (e.g., App.tsx), you can access the username like this:
        

        if (user && user.username) {
            console.log('Logged in username:', user.username)
        }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!user.username){
                setMessage("Username is required to login!")
                setTimeout(() => setMessage(''), 3000)
            }

            if (!user.password){
                setMessage("Password is required to login!")
                setTimeout(() => setMessage(''), 3000)
            }

            if (user.username && user.password) {
                const response = await login(user)
                if (response) {
                    Auth.login(response.token)
                    setUser({
                            id: null,
                            username: null,
                            email: null,
                            password: null,
                            favorites: null,
                            primaryGroup: null,
                        })
                    setMessage("You have succesfully logged in!")
                    setTimeout(() => setMessage(''), 3000)
                }
                console.log('Login successful:', response)
            }
        } catch (error) {
            console.error('Login failed:', error)
            setMessage("Your attempt to login failed. Please try again.")
            setTimeout(() => setMessage(''), 3000)
        }
    }

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            Auth.logout()
            const verify = Auth.getToken()
            if (!verify){
                setMessage("You have successfully logged out!")
                setTimeout(() => setMessage(''), 1500)
                setInterval(() => window.location.assign('/'), 1500)
            }
        } catch (error) {
            console.error('Login failed:', error)
            setMessage("Log out failed.")
            setTimeout(() => setMessage(''), 10000)
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
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username || ''}
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
                <button className='btn btn-outline-light' type='submit' onClick={handleSubmit}>Login</button>
                <button className='btn btn-outline-light' onClick={handleLogout}>Log Out</button>
                <button className='btn btn-outline-light'><Link to='/signup'>Signup</Link></button>
                <h6>{message}</h6>
                {/* <h2>Existing Users</h2>
                <ul>
                    {users.map((u) => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul> */}
            </div>
        </>
    )
}

