class AuthService {

    loggedIn() {
        const token = this.getToken()
        return token
    }

    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    }

    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        setInterval(() => window.location.assign('/'), 3000)
    }

    logout() {
        localStorage.removeItem('id_token');
    }
}

export default new AuthService();