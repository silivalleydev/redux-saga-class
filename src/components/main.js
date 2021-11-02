import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Main = (props) => {

    const {
        userList = []
    } = props;

    return (
        <div>
            <div>
                <Link to="/search">검색 페이지로</Link>
            </div>
            main
            <div>
                {"검색된 유저 수 => " + userList.length }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList
    }
}

export default connect(mapStateToProps, null)(Main);
