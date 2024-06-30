import React, { useState, useEffect, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { getAsanaTaskDetails, updateAsanaTaskStory, deleteAsanaTaskStory, createAsanaTaskStory } from "../services/AsanaService";
import { PendingTasksContext } from '../context/PendingTasksProvider';
import Comment from './Comment';
import { ClipLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import "./AsanaNavBar.css";
import "./TestingAndDefectFixingSideBar.css";

function TestingAndDefectFixingSideBar({
  selectedTask,
  handleCloseDetailView,
}) {
  const [loading, setLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const { dateAndTimeConverter, linkify,setSelectedTask } = useContext(PendingTasksContext)

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
      setLoading(true);
      const storyData = { text: newCommentText };
      const newComment = await createAsanaTaskStory(selectedTask.subTask.gid, storyData);
      setComments([...comments, newComment]);
      setNewCommentText("");
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
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
              <p><strong>Name:</strong> {selectedTask.subTask?.assignee?.name ?? "N/A"}</p>
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
                  <div key={each.gid} style={{ padding: "3px" }}>
                    <Link onClick={()=>setSelectedTask(null)} to={`/asana-internal/task/${each.gid}`} className={each.completed ? 'completedClassName' : 'notCompletedClassName'} style={{ padding: "5px", borderRadius: "10px", display: "block" }}>{each.name}</Link>
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
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a comment"
                  style={{ width: "95%", padding: "10px", borderRadius: "5px", outline: "none" }}
                />
                <button className="add-comment-btn" onClick={handleCreateComment}>Add Comment</button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default TestingAndDefectFixingSideBar;
