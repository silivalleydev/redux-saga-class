import axios from "axios";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { SEARCH_USERS_FAIL, SEARCH_USERS_REQ, SEARCH_USERS_SUCCESS } from "./action";


function getUsers(params = "") {
    // 먼저 api호출을 위해 axios 패키지를 다운로드 받습니다
    // 아까 서버에서요청한 users api를 호출하기위해 해당 주소를 가져오고
    // params를 합쳐서 검색 조건에따라 필터되도록 할겁니다.
    return axios.get("http://localhost:8080/users" + params)
}

// 이함수는 사용자 검색 액션 요청에 따라 실행되는 함수로
// 이 함수를통해 액션을 dispatch(전달? 실행?)해서 api를 호출하여 
// 그 결과를 전달할 예정입니다.....
// 먼저 api를 호출하는 함수를 만듭니다.
function* searchRequest(action) {

    // 이제 순서대로 호출해보겠습니다...
    // 먼저 call함수를 이용하여 api를 호출할 겁니다
    // call은 함수를 동기적으로 실행해줍니다
    // getUsers 함수를 호출하고 SEARCH_USERS_REQ 액션 실행시 전달되는
    // params를 getUsers함수로 넘깁니다.
    const userData = yield call(getUsers, action.params);

    // 이제 put함수로 action을 dispatch(전달?)할겁니다.
    // try catch문을 이용해서 성공시 실패시를 분기처리할겁니다.
    try {
        // 성공시 SEARCH_USERS_SUCCESS 액션을 디스패치하여 유저데이터를 넘깁니다.
        yield put({ type: SEARCH_USERS_SUCCESS, data: userData.data })
    } catch (error) {
        // 실패시 SEARCH_USERS_FAIL 액션을 디스패치하여 에러를 넘깁니다...
        yield put({ type: SEARCH_USERS_FAIL, data: error.response.data })
    }
    
}

// 이제 SEARCH_USERS_REQ 액션을 감지하는 함수를 userSaga에 먼저 세팅합니다.
function* waitSearchReq () {
    // yield 키워드는 다음동작을 제어하는 의미를 가지는 es6문법입니다.
    // takeLatest는 가장 마지막에 실행된 액션을 감지하는 것입니다.
    // 두번째로 핸들러를 제공하여 실행할 함수를 구성합니다...
    yield takeLatest(SEARCH_USERS_REQ, searchRequest)
}

// userSaga를 먼저 만들었습니다. 그다음 액션을 리슨하는 함수를 만들겁니다.
// 액션을 리슨 한다는 것은 그 액션이 실행됨을 감지하는 함수입니다.
export default function* userSaga() {
    // all 함수는 내부배열에 등록된 사가 함수들을 리덕스 사가 미들웨어에
    // 등록하는 부수효과 함수입니다.
    //이제 세팅되었으니 루트 사가 함수에 세팅합니다.
    yield all([waitSearchReq()])
}