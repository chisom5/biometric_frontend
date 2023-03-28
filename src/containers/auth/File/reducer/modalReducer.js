export const initialModals = {
  showAddFile: false,
  showDeleteFile: false,
  showEditFile: false,
  currentFileData: null,
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FILE":
      return {
        ...state,
        ...action.payload,
      };

    case "DELETE_FILE":
      return {
        ...state,
        ...action.payload,
      };

      case "EDIT_FILE":
      return {
        ...state,
        ...action.payload,
      };


    case "RESET_FILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
