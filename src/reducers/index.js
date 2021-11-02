import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import { all, fork } from 'redux-saga/effects';
import userSaga from './user/saga';

export const reducers = combineReducers({
    userReducer
});


// yield 키워드 뒤에 리덕스 사가의 부수효과 함수가 온다.
export function* rootSaga() {
  yield all([fork(userSaga)]);
}