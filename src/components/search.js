import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUsersReq } from '../reducers/user/action';

const Search = (props) => {

    const {
        userList = [],
        searchUsers
    } = props;

    // 우린 이름으로 검색을할 예정입니다.
    const [name, setName] = React.useState("");

    console.log(props);

    return (
        <div>
            <div>
                <Link to="/">메인 페이지로</Link>
            </div>
            검색페이지
            <div>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={() => searchUsers(`?name=${name}`)}>검색</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    이름
                                </th>
                                <th>
                                    전화번호
                                </th>
                                <th>
                                    이메일
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.map(user =>    
                                <tr>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.phone}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsers: (params) => dispatch(searchUsersReq(params))
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);