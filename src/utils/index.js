export const extractCurrenAuthUser =(arr, tokenUser)=> {
    const result = arr?.filter((user) => user.username === tokenUser);

    return result.length !== 0 ? result[0] : []
}