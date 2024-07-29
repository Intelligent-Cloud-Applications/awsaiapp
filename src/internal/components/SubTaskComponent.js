import { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import './PendingTasks.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import { useState } from 'react';
function SubTaskComponent({
  subTask,
  task,
  editTaskId,
  editedNotes,
  taskLoading,
  textareaRef,
  handleTitleClick,
  handleEditClick,
  handleSaveClick,
  deleteTask,
  setEditedNotes,
  debouncedAdjustTextareaHeight,
  adjustTextareaHeight,
}) {
  const [expandedSubTasks, setExpandedSubTasks] = useState({});
  const {getColorForLetter} = useContext(PendingTasksContext);
  const toggleShowAll = (gid) => {
    setExpandedSubTasks(prevState => ({
      ...prevState,
      [gid]: !prevState[gid]
    }));
  };
  return (
    subTask.name && (
      <div key={subTask.gid} className={`asana-subTasks-boxes ${subTask.notes ? 'asana-subTasks-boxes-with-notes' : ''}`}>
        <span onClick={() => handleTitleClick(task, subTask)} className='side-screen'><strong>{subTask.name.toUpperCase()}</strong></span>
        {subTask.due_on && <><span className='due-on'><strong>Due on: </strong>{subTask.due_on.split("-").reverse().join("-")}</span></>}

        <div>
          <span className='desc'>{"Description:"}</span>
          {editTaskId === subTask.gid ? (
            <textarea
              ref={textareaRef}
              value={editedNotes}
              onChange={(e) => {
                setEditedNotes(e.target.value);
                debouncedAdjustTextareaHeight(e);
              }}
              onInput={adjustTextareaHeight}
              style={{ overflow: 'hidden' }}
              className='editable-textarea'
            />
          ) : (
            <div>
              <div className='mimic-pre' onClick={() => handleEditClick(subTask)}>
                {subTask.notes ? (
                  expandedSubTasks[subTask.gid] ? subTask.notes : `${subTask.notes.substring(0, 100)}${subTask.notes.length > 100 ? '...' : ''}`
                ) : (
                  <em style={{fontSize:14,color:"gray"}}>What is the task about?</em>
                )}
              </div>
              {subTask.notes.length > 100 && (
                <p onClick={() => toggleShowAll(subTask.gid)} className='show-more-less'>
                  {expandedSubTasks[subTask.gid] ? 'Show Less' : 'Show More'}
                </p>
              )}
            </div>
          )}
        </div>
        <div className='last-line'>
          <div className='edit-delete'>
            {taskLoading[`save_${subTask.gid}`] ? (
              <ClipLoader size={20} />
            ) : editTaskId === subTask.gid ? (
              <SaveIcon
                className='change'
                onClick={() => handleSaveClick(subTask)}
              />
            ) : (
              <EditNoteIcon
                className='change'
                onClick={() => handleEditClick(subTask)}
              />
            )}
            {taskLoading[`delete_${subTask.gid}`] ? (
              <ClipLoader size={20} />
            ) : (
              <DeleteIcon
                className='change'
                onClick={() => deleteTask(subTask.gid)}
              />
            )}
          </div>
          <div className='address-details'>
            <div className='name-image' style={{ backgroundColor: getColorForLetter(task.name[0].toUpperCase()) }}>{task.name[0].toUpperCase()}</div>
            <strong className='assigne-name'>{task.name}</strong>
          </div>
        </div>
      </div>
    )
  );
}

export default SubTaskComponent;


