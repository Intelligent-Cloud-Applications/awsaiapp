import React, { useEffect, useState } from 'react';
import { fetchProjectTasks } from '../services/AsanaService';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './Tasks.css';

const Tasks = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [tasksWithStatus, setTasksWithStatus] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await fetchProjectTasks(projectId);
        setTasksWithStatus(tasksData)
      } catch (error) {
        console.log('Error fetching tasks:', error);
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
              {tasksWithStatus.map((task) => (
                task.name && (
                  <li key={task.gid} className="task-item">
                    <Link to={`/asana-internal/task/${task.gid}`} className="task-link">{task.name}</Link>
                    <div className="task-status">({task?.memberships[0]?.section?.name || 'No Status'})</div>
                  </li>
                )
              ))}
            </ul>
        }
      </div>
    </div>
  );
}
  export default Tasks;
