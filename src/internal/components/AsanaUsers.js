import React, { useState, useEffect } from 'react';
import { getAllUsersAsana } from '../services/AsanaService';
import { ClipLoader } from 'react-spinners';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsersAsana();
        setUsers(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  if(loading){
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><ClipLoader color='#3f51b5' loading={loading} size={150} /></div>
  }

  return (
    <div>
      <h1 style={{fontWeight:700}}>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.gid} style={{ margin: '10px 0' }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
