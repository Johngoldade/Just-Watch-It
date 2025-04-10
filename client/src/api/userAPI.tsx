import Auth from '../utils/auth'

const retrieveUsers = async () => {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab');
        }

        return data
    } catch (err) {
        console.log('Error from data retrival: ', err);
        return [];
    }
}

const getPriorityGroup = async () => {
    try {

    } catch (err) {
        console.log('Error from data retival:', err);
        return [];
    }
}

export { retrieveUsers, getPriorityGroup }