import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllUsersAsana, fetchUserDetails } from '../services/AsanaService';
import { ClipLoader } from 'react-spinners';

Modal.setAppElement('#root'); // Important for accessibility

function AsanaUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsersAsana();
        setUsers(data.data);
        // console.log(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (userGid) => {
    try {
      setLoading(true);
      const res = await fetchUserDetails(userGid);
      setSelectedUser(res);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }finally{
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color='#3f51b5' loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(to right, #606060,#FFF8F8 )',
      padding: '20px', 
      minHeight: '100vh', 
      color: '#fff',
    }}>
      <h1 style={{ fontWeight: 700 }}>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.gid} style={{ margin: '10px 0', cursor: 'pointer',border:"1px solid black",padding:"10px" }} onClick={() => handleUserClick(user.gid)}>
            {user.name}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Details"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none',
            outline: 'none',
          },
        }}
      >
        {selectedUser ? (
          <div>
            <div className='flex justify-between items-center'>
            <h2>{selectedUser?.name}</h2>
            {
              selectedUser.photo && (
                <img src={selectedUser.photo.image_36x36} className='rounded-full' alt={selectedUser.name} />
              )
            }

            </div>
            <p>Email: {selectedUser?.email||"Email not present"}</p>
            {/* Add other details you want to display */}
            <button className={`border-2 border-black  p-1`} onClick={closeModal}>Close</button>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </Modal>
    </div>
  );
}

export default AsanaUsers;

