import React, { useState, useEffect, useContext, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { getAsanaTaskDetails, updateAsanaTaskStory, deleteAsanaTaskStory, createAsanaTaskStory, updateTask } from "../services/AsanaService";
import { PendingTasksContext } from '../context/PendingTasksProvider';
import Comment from './Comment';
import { ClipLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
// import SaveIcon from '@mui/icons-material/Save';
import CircularIntegration from './CircularIntegration';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AsanaNavBar.css";
import "./TestingAndDefectFixingSideBar.css";

function TestingAndDefectFixingSideBar({
  selectedTask,
  handleCloseDetailView,
  deleteTask,
}) {
  const [loading, setLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [editedSubtaskName, setEditedSubtaskName] = useState("");
  const { dateAndTimeConverter, linkify, setSelectedTask } = useContext(PendingTasksContext);

  const handleDelete = useCallback(async (subTaskGid) => {
    try {
      setLoading(true);
      await deleteTask(subTaskGid);
      setSelectedTask(prevTask => ({
        ...prevTask,
        subTaskSubTask: prevTask.subTaskSubTask.filter(subTask => subTask.gid !== subTaskGid),
      }));
    } catch (error) {
      console.error('Error deleting subtask:', error);
    } finally {
      setLoading(false);
    }
  }, [deleteTask, setSelectedTask]);

  const handleUpdate = useCallback(async (subTaskGid, data) => {
    try {
      setLoading(true);
      await updateTask(subTaskGid, data);
      setSelectedTask(prevTask => ({
        ...prevTask,
        subTaskSubTask: prevTask.subTaskSubTask.map(subTask =>
          subTask.gid === subTaskGid ? { ...subTask, ...data } : subTask
        ),
      }));
      setEditingSubtask(null); // Reset the editing state after update
    } catch (error) {
      console.error('Error updating subtask:', error);
    } finally {
      setLoading(false);
    }
  }, [setSelectedTask]);

  useEffect(() => {
    const fetchSubtaskComments = async () => {
      try {
        if (selectedTask && selectedTask.subTask) {
          setLoading(true)
          const taskDetails = await getAsanaTaskDetails(selectedTask.subTask.gid);
          setComments(taskDetails.stories.data);
        }
      } catch (error) {
        console.error('Error fetching subtask comments:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchSubtaskComments();
  }, [selectedTask]);

  const handleEditClickComment = (comment) => {
    setEditableCommentId(comment.gid);
    setEditedText(comment.text);
  };

  const handleUpdateComment = async (storyGid) => {
    try {
      setLoading(true);
      const storyData = { text: editedText };
      await updateAsanaTaskStory(storyGid, storyData);
      setComments(comments.map(comment =>
        comment.gid === storyGid ? { ...comment, text: editedText } : comment
      ));
      setEditableCommentId(null);
      setEditedText("");
    } catch (error) {
      console.error('Error updating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (storyGid) => {
    try {
      setLoading(true);
      await deleteAsanaTaskStory(storyGid);
      setComments(comments.filter(comment => comment.gid !== storyGid));
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async () => {
    try {
      const storyData = { text: newCommentText };
      if ((storyData.text).trim() === "") return;
      else {
        setLoading(true);
        const newComment = await createAsanaTaskStory(selectedTask.subTask.gid, storyData);
        setComments([...comments, newComment]);
        setNewCommentText("");
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubtaskClick = (subtask) => {
    setEditingSubtask(subtask.gid);
    setEditedSubtaskName(subtask.name);
  };

  const handleSaveSubtaskName = (subtaskGid) => {
    handleUpdate(subtaskGid, { name: editedSubtaskName });
  };

  return (
    <div className={`detail-view ${selectedTask ? 'open' : ''}`}>
      <CloseIcon onClick={handleCloseDetailView} className='asana-sidebar-close-btn' />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ClipLoader />
        </div>
      ) : (
        selectedTask && (
          <>
            <h2 className='right-screen-task-name'>
              {selectedTask.subTask && selectedTask.subTask.name ? selectedTask.subTask.name.toUpperCase() : 'N/A'}
            </h2>
            <div className='user-details'>
              <div className='flex items-center justify-between'>
                <p><strong>Name:</strong> {selectedTask.subTask?.assignee?.name ?? "N/A"}</p>
                {
                  selectedTask?.subTask?.assignee?.photo?.image_27x27 &&
                  <img src={selectedTask?.subTask?.assignee?.photo?.image_27x27} alt='pic' />
                }

              </div>
              {selectedTask?.subTask?.assignee?.email && selectedTask.subTask.assignee.name !== selectedTask.subTask.assignee.email && (
                <p><strong>Email:</strong> {selectedTask.subTask?.assignee?.email}</p>
              )}
              <p><strong>Created at: </strong>{dateAndTimeConverter(selectedTask.subTask.created_at)}</p>
              <p><strong>Modified at: </strong>{dateAndTimeConverter(selectedTask.subTask.modified_at)}</p>
              {selectedTask.subTask.due_on && (
                <p><strong>Due Date:</strong> {selectedTask.subTask.due_on.split("-").reverse().join("-")}</p>
              )}
            </div>
            {selectedTask.subTask.notes && (
              <>
                <p><strong>Description:</strong></p>
                <div className='notes' dangerouslySetInnerHTML={{ __html: linkify(selectedTask.subTask.notes) }}></div>
              </>
            )}
            {
              selectedTask.subTaskSubTask.length > 0 &&
              <div>
                <p style={{ fontWeight: 700 }}>SubTasks:</p>
                {selectedTask.subTaskSubTask.map((each) =>
                  <div key={each.gid} style={{ padding: "3px" }} className={each.completed ? 'completedClassName flex justify-between items-center mb-1' : 'notCompletedClassName flex justify-between items-center mb-1'}>
                    {editingSubtask === each.gid ? (
                      <>
                        <input
                          type="text"
                          value={editedSubtaskName}
                          onChange={(e) => setEditedSubtaskName(e.target.value)}
                          style={{ padding: "5px", borderRadius: "5px", outline: "none" }}
                        />
                        <CircularIntegration onClick={() => handleSaveSubtaskName(each.gid)} className='cursor-pointer' />
                      </>
                    ) : (
                      <>
                        <Link onClick={() => setSelectedTask(null)} to={`/asana-internal/task/${each.gid}`} style={{ padding: "5px", borderRadius: "10px" }}>{each.name}</Link>
                        <div className='space-x-3'>
                        <EditNoteIcon onClick={() => handleEditSubtaskClick(each)} className='cursor-pointer' />
                        <DeleteIcon onClick={() => handleDelete(each.gid)} className='cursor-pointer' />
                        </div>
                      </>
                    )}
                  </div>)}
              </div>
            }

            <div className='content'>
              {comments.filter(comment => comment.type === 'comment').length > 0 && (
                <div className='subtask-comments'>
                  <h3 style={{ fontWeight: 700 }}>Comments:</h3>
                  {comments.filter(comment => comment.type === 'comment').map((comment) => (
                    <Comment
                      key={comment.gid}
                      comment={comment}
                      editableCommentId={editableCommentId}
                      editedText={editedText}
                      setEditedText={setEditedText}
                      handleUpdateComment={handleUpdateComment}
                      handleEditClickComment={handleEditClickComment}
                      handleDeleteComment={handleDeleteComment}
                      dateAndTimeConverter={dateAndTimeConverter}
                    />
                  ))}
                </div>
              )}
              <div className='create-comment-asana'>
                <textarea
                  className='w-full'
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add your comment here..."
                  style={{ padding: "10px", borderRadius: "5px", outline: "none" }}
                />
                <button className="add-comment-btn" onClick={handleCreateComment}> Comment</button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default TestingAndDefectFixingSideBar;
