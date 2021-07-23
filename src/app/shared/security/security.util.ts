export class Security {
    public static setLogin(username: string, role: string, token: string) {
        localStorage.setItem('username', username)
        localStorage.setItem('role', role)
        localStorage.setItem('token', token)
    }
}