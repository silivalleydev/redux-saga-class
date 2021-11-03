import { all, fork } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import userSaga from "./user/saga";

export const reducers = combineReducers({
    userReducer
})

// 사가함수를 작성할땐 * 별표 키워드와 함께 시작하는 것 참고해주세요
// 정확한 이론은 아니니 참고만해주세요
//패턴처럼 이해하시면 더 쉽습니다
// 그다음 user에 saga.js 파일을 만들어 userSaga를 구성합니다
export function* rootSaga() {

    // 아까 봤던 call함수와 반대로 fork함수는 비동기로 함수를 실행합니다.
    // 비동기 처리에 대한 이해가 어렵더라도 넘기시고 나중에 다뤄볼예정이니
    // 걱정마세요 ㅎㅎ...
    // 자... 그러면 최종 사가 함수를 만들었으니 리덕스에 미들웨어를 연결해보겠습니다.
    yield all([fork(userSaga)])
} 