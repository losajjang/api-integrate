import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useReducer} from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  // const [users, setUsers] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchUser = async () => {
  //   try {
  //     // 요청이 시작 할 때에는 error와 users를 초기화하고
  //     setError(null);
  //     setUsers(null);
  //     // loading 상태를 true 로 바꿉니다.
  //     setLoading(true);
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users',
  //     );
  //     setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
  //   } catch (e) {
  //     setError(e);
  //   }
  //   setLoading(false);
  // };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    dispatch({type: 'LOADING'});
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch({type: 'SUCCESS', data: response.data});
    } catch (e) {
      dispatch({type: 'ERROR', error: e});
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const {loading, data: users, error} = state; // state.data 를 users 키워드로 조회F

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUser}>다시 불러오기</button>
    </>
  );
}

export default Users;
