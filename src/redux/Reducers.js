import { LOGIN, LOGOUT, SYNC_SESSION } from "./Actions"

const initialState = {
    user: null,
    token: '',
    isLoggedIn: true,
}

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user:  action.data?.user,
                token: action.data?.token,
                isLoggedIn: true
            }
        case LOGOUT: 
            return {
                ...state,
                user: {},
                token: '',
                isLoggedIn: false
            }
        case SYNC_SESSION:
            return {
                ...state,
                user:  action.data?.user,
                token: action.data?.token,
                isLoggedIn: action.data?.isLoggedIn
            }

        default: return state
    }
}