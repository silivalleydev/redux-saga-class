import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUsersReq } from '../reducers/user/action';

const Search = (props) => {

    const {
        userList = [],
        searchUsers
    } = props;

    const [name, setName] = React.useState("");

    return (
        <div>
            <div>
                <Link to="/">메인 페이지로</Link>
            </div>
            검색
            <div>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={() => searchUsers("?name=" + name)}>검색</button>
                <div>
                    <table>
                        <thead>
                            <th>
                                이름
                            </th>
                            <th>
                                전화번호
                            </th>
                            <th>
                                이메일
                            </th>
                        </thead>
                        <tbody>
                            {userList.map((user = {}, idx) => 
                                <tr key={`user-${user.userSeq}`}>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsers: (params = "") => dispatch(searchUsersReq(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
