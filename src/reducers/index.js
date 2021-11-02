import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import { all, fork } from 'redux-saga/effects';
import userSaga from './user/saga';

export const reducers = combineReducers({
    userReducer
});


// yield 키워드 뒤에 리덕스 사가의 부수효과 함수가 온다.
export function* rootSaga() {
    // 매개변수로 전달된 함수를 비동기적으로 실행한다 
    // 비동기란 쉽게 말하면그 함수를 누군가에게 대신 실행하게 맡기고 나는 다른일을 하러 떠나는 것이다.
  yield all([fork(userSaga)]);
}