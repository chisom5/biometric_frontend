export const initialModals = {
  showAddFile: false,
  showDeleteFile: false,
  currentFileId: null,
  previewOpen: false,
  previewImage: "",
  previewTitle: "",
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

    case "PREVIEW_IMAGE":
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
