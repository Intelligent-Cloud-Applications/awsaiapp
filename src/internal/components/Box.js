import React, { useContext, useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import './PendingTasks.css';
import './Box.css';

function Box({
  subTask,
  editTaskId,
  taskLoading,
  textareaRef,
  handleTitleClick,
  handleEditClick,
  handleSaveClick,
  deleteTask,
  setEditedName,
  debouncedAdjustTextareaHeight,
  adjustTextareaHeight,
  editedName,
}) {
  const [expandedSubTasks, setExpandedSubTasks] = useState({});
  const { getColorForLetter, loading, setLoading } = useContext(PendingTasksContext);
  const [localEditedNotes, setLocalEditedNotes] = useState(subTask.notes);

  useEffect(() => {
    setLocalEditedNotes(subTask.notes);
  }, [subTask.notes]);

  const toggleShowAll = (gid) => {
    setExpandedSubTasks((prevState) => ({
      ...prevState,
      [gid]: !prevState[gid],
    }));
  };

  const handleTitleClickWrapper = (subTask, event) => {
    event.preventDefault();
    try {
      handleTitleClick(subTask, event);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(true);
    }
  };

  const handleFieldChange = (field, value) => {
    setLocalEditedNotes(value);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleCompleteChange = async (subTask) => {
    try {
      const updatedFields = { completed: !subTask.completed };
      await handleSaveClick(subTask, updatedFields);
    } catch (error) {
      console.error('Error updating task completion status:', error);
    }
  };

  const handleEditClickWrapper = (subTask) => {
    setEditedName(subTask.name);
    handleEditClick(subTask);
  };

  return (
    <div
      key={subTask.gid}
      id={`${subTask.completed ? 'asana-subTasks-boxes-completed' : ''}`}
      className={`asana-subTasks-boxes ${subTask.notes ? 'asana-subTasks-boxes-with-notes' : ''}`}
    >
      {loading ? (
        <ClipLoader size={20} />
      ) : (
        <>
          <div className="task-header">
            {editTaskId === subTask.gid ? (
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                className="editable-task-name"
              />
            ) : (
              <span onClick={(e) => handleTitleClickWrapper(subTask, e)} className="side-screen">
                <strong>{subTask.name ? subTask.name.toUpperCase() : ''}</strong>
              </span>
            )}
            <Checkbox
              checked={subTask.completed}
              onChange={() => handleCompleteChange(subTask)}
              inputProps={{ 'aria-label': 'complete subtask' }}
            />
          </div>
          {subTask.due_on && (
            <span className="due-on">
              <strong>Due on: </strong>
              {subTask.due_on.split('-').reverse().join('-')}
            </span>
          )}

          <div>
            <span className="desc">{'Description:'}</span>
            {editTaskId === subTask.gid ? (
              <textarea
                ref={textareaRef}
                value={localEditedNotes}
                onChange={(e) => {
                  handleFieldChange('notes', e.target.value);
                  debouncedAdjustTextareaHeight(e);
                }}
                onInput={adjustTextareaHeight}
                style={{ overflow: 'hidden' }}
                className="editable-textarea"
              />
            ) : (
              <div>
                <div className="mimic-pre" onClick={() => handleEditClickWrapper(subTask)}>
                  {subTask.notes ? (
                    expandedSubTasks[subTask.gid]
                      ? subTask.notes
                      : `${subTask.notes.substring(0, 100)}${subTask.notes.length > 100 ? '...' : ''}`
                  ) : (
                    <em style={{ fontSize: 14, color: 'gray' }}>What is the task about?</em>
                  )}
                </div>
                {subTask.notes.length > 100 && (
                  <p onClick={() => toggleShowAll(subTask.gid)} className="show-more-less">
                    {expandedSubTasks[subTask.gid] ? 'Show Less' : 'Show More'}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="last-line">
            <div className="edit-delete">
              {taskLoading[`save_${subTask.gid}`] ? (
                <ClipLoader size={20} />
              ) : editTaskId === subTask.gid ? (
                <SaveIcon
                  className="change"
                  onClick={() => handleSaveClick(subTask, { name: editedName || subTask.name, notes: localEditedNotes })}
                />
              ) : (
                <EditNoteIcon className="change" onClick={() => handleEditClickWrapper(subTask)} />
              )}
              {taskLoading[`delete_${subTask.gid}`] ? (
                <ClipLoader size={20} />
              ) : (
                <DeleteIcon className="change" onClick={() => deleteTask(subTask.gid)} />
              )}
            </div>
            <div className="address-details">
              {subTask.assignee ? (
                <>
                  <div
                    className="name-image"
                    style={{ backgroundColor: getColorForLetter(subTask.assignee.name[0].toUpperCase()) }}
                  >
                    {subTask.assignee.name[0].toUpperCase()}
                  </div>
                  <strong className="assigne-name">{subTask.assignee.name}</strong>
                </>
              ) : (
                <div className="name-image">N/A</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Box;
