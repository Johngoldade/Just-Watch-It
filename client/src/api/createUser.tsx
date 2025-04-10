
const createUser = async (username: string, email: string, password: string) => {
    try {
        const body = {
            username,
            email,
            password
        }
        const response = await fetch('user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        return await response.json();
    } catch (error) {
        console.log('Error from User Creation: ', error);
        return Promise.reject('Failed to create user');
    }
}


export { createUser }
