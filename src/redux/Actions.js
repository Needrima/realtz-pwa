export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const SYNC_SESSION = 'sync_session';

export const login = (data) => {
    localStorage.setItem('token', data.token, { secure: true });
    localStorage.setItem('user', JSON.stringify(data.user), { secure: true });

    return {
        type: LOGIN,
        data: data,
    }
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return {
        type: LOGOUT,
    }
}

export const syncSession = (data) => {
    return {
        type: SYNC_SESSION,
        data: data,
    }
}