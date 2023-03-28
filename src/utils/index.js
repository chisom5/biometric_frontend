export const extractCurrenAuthUser =(arr, tokenUser)=> {
    const result = arr?.filter((user) => user.username === tokenUser);

    return result.length !== 0 ? result[0] : []
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });