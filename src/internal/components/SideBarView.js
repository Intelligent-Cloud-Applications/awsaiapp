import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import "./AsanaNavBar.css";
import "./PendingTasks.css";

function SideBarView({ 
  selectedTask, 
  handleCloseDetailView, 
  dateAndTimeConverter, 
  linkify 
}) {

  return (
    <div className={`detail-view ${selectedTask ? 'open' : ''}`}>
      <CloseIcon onClick={handleCloseDetailView} className='asana-sidebar-close-btn' />
      <h2 className='right-screen-task-name'>{(selectedTask.pendingTasks[0].name).toUpperCase()}</h2>
      <div className='user-details'>
        <p><strong>Name:</strong> {selectedTask.name}</p>
        {(selectedTask.email && selectedTask.name !== selectedTask.email) && <p><strong>Email:</strong> {selectedTask.email}</p>}
        <>
          <p><strong>Created at: </strong>{dateAndTimeConverter(selectedTask.pendingTasks[0]?.created_at)}</p>
          <p><strong>Modified at: </strong>{dateAndTimeConverter(selectedTask.pendingTasks[0]?.modified_at)}</p>
        </>
        {selectedTask.pendingTasks[0]?.due_on &&
          <>
            <p><strong>Due Date:</strong> {selectedTask.pendingTasks[0]?.due_on?.split("-").reverse().join("-")}</p>
          </>
        }
      </div>
      {selectedTask.pendingTasks[0]?.notes &&
        <>
          <p><strong>Description:</strong></p>
          <div className='notes' dangerouslySetInnerHTML={{ __html: linkify(selectedTask.pendingTasks[0]?.notes) }}></div>
        </>
      }
    </div>
  );
}

export default SideBarView;

