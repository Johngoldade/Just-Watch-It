import type  { User } from '../interfaces/User'

const login = async (userInfo: User) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Network error')
        }

        return data;
    } catch (err) {
        console.log('There was a problem logging in: ', err);
        return Promise.reject('Could not fetch user info');
    }
}

export { login };