import { useEffect, useState } from 'react'
import { User } from '../interfaces/User'
import { login } from '../api/authAPI'
import { retrieveUsers } from '../api/userAPI'

export default function SignUp() {
    const [user, setUser] = useState<User>({
        id: null,
        username: null,
        email: null,
        password: null,
    })

    const [users, setUsers] = useState<User[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await login(user)
            console.log('Login successful:', response)
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
    }
    , [])
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username || ''}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email || ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password || ''}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            <div>
                <h2>Users</h2>
                {users.map((user) => (
                    <div key={user.id}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}