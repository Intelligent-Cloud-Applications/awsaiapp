// src/context/PendingTasksProvider.js

import React, { createContext, useState, useEffect } from 'react';
import { getAllUsersAsana,fetchUsersWithPendingTasks } from '../services/AsanaService';

export const PendingTasksContext = createContext();

const PendingTasksProvider = ({ children }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersWithGid, setUsersWithGid] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
      getAllUsersAsana()
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          setUsersWithGid(prevState => ({
            ...prevState,
            [response.data[i].gid]: response.data[i].name,
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);


  useEffect(() => {
    const fetchPendingTasks = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchUsersWithPendingTasks();
        const tasks = response;
        const pendingTasks = tasks.filter(task => !task.completed);
        setPendingTasks(pendingTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingTasks();
  }, []);
  
  function linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
  }

  function dateAndTimeConverter(str) {
    const date = new Date(str);
    const hours = date.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedDateManual = ('0' + date.getDate()).slice(-2) + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      date.getFullYear() + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ' ' + amOrPm;

    return formattedDateManual;
  }

  function getColorForLetter(letter) {
    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  }

  return (
    <PendingTasksContext.Provider value={{ usersWithGid,pendingTasks, loading,selectedTask,setPendingTasks,setLoading,linkify,dateAndTimeConverter,getColorForLetter,setSelectedTask }}>
      {children}
    </PendingTasksContext.Provider>
  );
};

export default PendingTasksProvider;
