import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../interfaces/User'
import { login } from '../api/authAPI'
import { retrieveUsers } from '../api/userAPI'
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

    const [users, setUsers] = useState<User[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
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
            }
            
            console.log('Login successful:', response)
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            Auth.logout()
            console.log('Logged out')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await retrieveUsers()
                setUsers(response)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        fetchUsers()
    }, [])

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
                <h2>Existing Users</h2>
                <ul>
                    {users.map((u) => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}