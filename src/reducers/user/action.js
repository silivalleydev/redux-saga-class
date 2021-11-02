export const SEARCH_USERS_REQ = "SEARCH_USERS_REQ";
export const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS";
export const SEARCH_USERS_FAIL = "SEARCH_USERS_FAIL";

export const searchUsersReq = (params) => {
    return {
        type: SEARCH_USERS_REQ,
        params
    }
}
export const searchUsersSuccess = (data) => {
    return {
        type: SEARCH_USERS_SUCCESS,
        data
    }
}
export const searchUsersFail = () => {
    return {
        type: SEARCH_USERS_FAIL
    }
}