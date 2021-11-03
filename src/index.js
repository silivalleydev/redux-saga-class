import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { reducers, rootSaga } from './reducers';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';

// 먼저 사가 미들웨어를 생성합니다.
const sagaMiddleware = createSagaMiddleware();

// 그다음 스토어에 미들웨어를 연결해줍니다
// 연결할때는 applyMiddleWare을 사용합니다.
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// 그다음 사가 미들웨어에서 통합 사가 함수를 실행시킵니다.
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
