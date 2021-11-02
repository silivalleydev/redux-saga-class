import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from "axios";
import { SEARCH_USERS_FAIL, SEARCH_USERS_REQ, SEARCH_USERS_SUCCESS } from './action';

function getUsers(params = "") {
    console.log("params??", params)
    return axios.get('http://localhost:8080/users' + params);
}
  
function* searchRequest(action) {
    console.log("action??", action)
    const userData = yield call(getUsers, action.params);
    console.log("data", userData)
    try {
        yield put({ type: SEARCH_USERS_SUCCESS, data: userData.data });
    } catch (err) {
        yield put({ type: SEARCH_USERS_FAIL, error: err.response.data });
    }
}
  
  // 로그인 요청이 들어오는지를 감지하는 제너레이터 함수
  // addEventListener 함수와 그 사용법이 비슷하다.
function* waitSearchReq() {
    yield takeLatest(SEARCH_USERS_REQ, searchRequest);
}

export default function* userSaga() {
    yield all([waitSearchReq()]);
}