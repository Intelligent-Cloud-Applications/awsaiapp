import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import SubTaskComponent from './SubTaskComponent';
import { deleteTaskAsana,updateTask,fetchUsersWithPendingTasks,fetchParticularTask } from '../services/AsanaService';
import { ClipLoader } from 'react-spinners';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import './PendingTasks.css';
import SideBarView from './SideBarView';

const PendingTasks = () => {
  const { pendingTasks, loading, setPendingTasks, setLoading,linkify,dateAndTimeConverter } = useContext(PendingTasksContext);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedNotes, setEditedNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [taskLoading, setTaskLoading] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const textareaRef = useRef(null);
  const webSocketRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.close();
        }
      } else if (document.visibilityState === 'visible') {
        if (!webSocketRef.current || webSocketRef.current.readyState === WebSocket.CLOSED) {
          webSocketRef.current = new WebSocket('ws://your_websocket_server');
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchPendingTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchUsersWithPendingTasks();
      const tasks = response;
      if (tasks) {
        const pendingTasks = tasks.filter(task => !task.pendingTasks.completed);
        // console.log('Pending tasks:', pendingTasks);
        setPendingTasks(pendingTasks);
      } else {
        console.error('No tasks data available to filter');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }finally {
      setLoading(false);
    }
  }, [setLoading, setPendingTasks]);
  useEffect(()=>{
    fetchPendingTasks()
  },[fetchPendingTasks])


  const editTask = useCallback(async (taskId, newNotes) => {
    try {
      await updateTask(taskId, { notes: newNotes });
      await fetchPendingTasks();
    } catch (error) {
      console.error('Error updating task notes:', error);
    }
  }, [fetchPendingTasks]); // Add any other dependencies if needed

  const deleteTask = async (taskId) => {
    try {
      setTaskLoading({ ...taskLoading, [`delete_${taskId}`]: true });
      await deleteTaskAsana(taskId);
      await fetchPendingTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setTaskLoading({ ...taskLoading, [`delete_${taskId}`]: false });
    }
  };

  const handleEditClick = (subTask) => {
    setEditTaskId(subTask.gid);
    setEditedNotes(subTask.notes || '');
    // console.log(subTask.notes);
  };

  const handleSaveClick = useCallback(async (subTask) => {
    try {
      if (editedNotes === subTask.notes) {
        setEditTaskId(null);
        return;
      } else {
        setTaskLoading({ ...taskLoading, [`save_${subTask.gid}`]: true });
        await editTask(subTask.gid, editedNotes);
        setEditTaskId(null);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setTaskLoading({ ...taskLoading, [`save_${subTask.gid}`]: false });
    }
  }, [editedNotes, taskLoading,editTask]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTitleClick = (task, subTask) => {
    const selectedSubTask = task.pendingTasks.find(t => t.gid === subTask.gid);
    setSelectedTask({ ...task, pendingTasks: [selectedSubTask] });
  };

  useEffect(() => {
    if (selectedTask) {
      fetchParticularTask(selectedTask.gid);
    }
  }, [selectedTask]);

  const handleCloseDetailView = () => {
    setSelectedTask(null);
  };

  // Add class to body when detail view is open/closed
  useEffect(() => {
    if (selectedTask) {
      document.body.classList.add('detail-view-open');
    } else {
      document.body.classList.remove('detail-view-open');
    }
  }, [selectedTask]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editTaskId && textareaRef.current && !textareaRef.current.contains(event.target)) {
        const currentTask = pendingTasks.find(task =>
          task.pendingTasks.some(subTask => subTask.gid === editTaskId)
        );
        const subTask = currentTask.pendingTasks.find(subTask => subTask.gid === editTaskId);
        handleSaveClick(subTask);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [editTaskId, editedNotes, pendingTasks,handleSaveClick]);


  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedAdjustTextareaHeight = debounce(adjustTextareaHeight, 100);


  return (
    <div className='container'>
      <div className='search'>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder='Search by user...' />
        <PersonSearchIcon style={{ fontSize: 30 }} />
      </div>
      <p className='heading'>Pending Tasks by Project</p>
      <div>
        {loading ? <div className='spinner-loader'><ClipLoader /></div> :
          pendingTasks.filter(task =>
            searchQuery === '' || task.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((task, index) => {
            return (
              <div key={index} className='container-for-each-person'>
                {
                  task.pendingTasks.length > 0 &&
                  <h2>{task.name}</h2>
                }
                <div className='long-box'>
                  {task.pendingTasks.map((subTask) => {
                    return (
                      <SubTaskComponent
                        key={subTask.gid}
                        subTask={subTask}
                        task={task}
                        editTaskId={editTaskId}
                        editedNotes={editedNotes}
                        taskLoading={taskLoading}
                        textareaRef={textareaRef}
                        handleTitleClick={handleTitleClick}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        deleteTask={deleteTask}
                        setEditedNotes={setEditedNotes}
                        debouncedAdjustTextareaHeight={debouncedAdjustTextareaHeight}
                        adjustTextareaHeight={adjustTextareaHeight}
                      />
                    );
                  })}
                </div>
                {(index !== pendingTasks.length - 1 && task.pendingTasks.length > 0) && <div className='separator' />}
              </div>
            );
          })
        }
      </div>
      {selectedTask && (
        <SideBarView
        selectedTask={selectedTask}
        handleCloseDetailView={handleCloseDetailView}
        dateAndTimeConverter={dateAndTimeConverter}
        linkify={linkify}
      />
      )}

    </div>
  );
};

export default PendingTasks;
