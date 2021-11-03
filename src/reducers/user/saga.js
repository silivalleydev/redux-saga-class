import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from "axios";
import { SEARCH_USERS_FAIL, SEARCH_USERS_REQ, SEARCH_USERS_SUCCESS } from './action';

function getUsers(params = "") {
    return axios.get('http://localhost:8080/users' + params);
}
  
function* searchRequest(action) {
    // yield는 다음 동작을 제어하는 ES6 문법이다.
    // Call()은 함수를 동기적으로 실행한다 
    // Call에 넘겨진 함수가 Promise를 리턴하면 그 Promise가 resolved 될 때까지 call()을 호출한 부분에서 실행이 멈춘다
    const userData = yield call(getUsers, action.params);
    try {
        // Put() 액션을 dispatch 한다. 
        // 보통 take로 액션을 캐치해서 api 호출을 call로 실행하고 성공/실패 여부에 따라 
        // 리덕스 스토어에 반영하기 위해서 호출하는 Effects이다
        yield put({ type: SEARCH_USERS_SUCCESS, data: userData.data });
    } catch (err) {
        yield put({ type: SEARCH_USERS_FAIL, error: err.response.data });
    }
}
  
  // 로그인 요청이 들어오는지를 감지하는 제너레이터 함수
  // addEventListener 함수와 그 사용법이 비슷하다.
  // takeLatest 가장 마지막에(최신) 실행된 액션에 대해서만 핸들러를 실행한다
function* waitSearchReq() {
    yield takeLatest(SEARCH_USERS_REQ, searchRequest);
}

export default function* userSaga() {
    // all 함수 내부 배열에 등록된 사가 함수들을 리덕스 사가 미들웨어에 등록하는 부수효과 함수
    yield all([waitSearchReq()]);
}