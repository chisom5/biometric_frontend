
export const initialModals = {
    showAddUser: false,
    showDeleteUser: false,
    showEditUser: false,
    currentUserObj: null
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

            case "EDIT_USER":
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