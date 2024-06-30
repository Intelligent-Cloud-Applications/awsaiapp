import React, { useEffect, useState } from 'react';
import { fetchTasksForProject } from '../services/AsanaService';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './Tasks.css'; // Adjust the path as necessary

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('projectId:', projectId);
    const getTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await fetchTasksForProject(projectId);
        setTasks(tasksData);

      } catch (error) {
        console.log('Error fetching tasks:', error)
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [projectId]);

  return (
    <div className='bg-tasks'>
      <div className="tasks-container">
        <h2 className='tasks'>Tasks</h2>
        {
          loading ? <div><ClipLoader /></div> :
            <ul className="tasks-list-asana">
              {tasks.map((task) => (
                task.name &&
                (<li key={task.gid} className="task-item">
                  <Link to={`/asana-internal/task/${task.gid}`} className="task-link">{task.name}</Link>
                </li>)
              ))}
            </ul>
        }
      </div>
    </div>
  );
};

export default Tasks;
