
export const initialModals = {
    showAddUser: false,
    showDeleteUser: false,
    currentUserId: null
}

export const modalReducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                ...action.payload
            }

        case "DELETE_USER":
            return {
                ...state,
                ...action.payload
            }
        case "RESET_USER":
            return { ...state, ...action.payload }
        default:
            return state;
    }
};