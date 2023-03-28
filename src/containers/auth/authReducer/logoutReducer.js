
export const initialState = {
    logoutIcon: false,
    logout: false,
    activeUser: null
}

export const logoutReducer = (state, action) => {
    switch (action.type) {


        case "OPEN_LOGOUT":
            return {
                ...state,
                ...action.payload
            }

            case "SAVE_LOGIN_USER":
                return {
                    ...state,
                    ...action.payload
                }

        case "DISMISS_LOGOUT":
            return { ...state, ...action.payload }
        default:
            return state;
    }
};