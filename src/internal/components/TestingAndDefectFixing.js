import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { getAsanaTaskInfo, getAsanaTaskDetails, deleteAsanaTaskStory, updateAsanaTaskStory, createAsanaTaskStory, updateTask, deleteTaskAsana } from "../services/AsanaService";
import TestingAndDefectFixingSideBar from './TestingAndDefectFixingSideBar';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import { MoonLoader } from 'react-spinners';
import Comment from './Comment';
import LazyLoadedBox from './LazyLoadedBox';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import "./TestingAndDefectFixing.css";

const TestingAndDefectFixing = ({ taskGidProp = '1207519116747438' }) => {
  const [taskInfo, setTaskInfo] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [editedName, setEditedName] = useState("");
  const { dateAndTimeConverter, loading, setLoading, selectedTask, setSelectedTask } = useContext(PendingTasksContext);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedNotes, setEditedNotes] = useState({});
  const [editedNotesTextArea, setEditedNotesTextArea] = useState("");
  const [taskLoading, setTaskLoading] = useState({});
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const textareaRef = useRef(null);
  const taskGid = taskGidProp; // Replace with task GID
  const [filterInput, setFilterInput] = useState(""); // State for filter input

  const fetchTaskInfo = useCallback(async () => {
    try {
      setLoading(true);
      const [taskData, taskDetails] = await Promise.all([getAsanaTaskInfo(taskGid), getAsanaTaskDetails(taskGid)]);
      setTaskInfo(taskData.data);
      setTaskDetails(taskDetails.data.data);
      setComments(taskDetails.stories.data);
      setEditedNotesTextArea(taskDetails.data.data.notes || ""); // Initialize textarea state
    } catch (error) {
      console.error('Error fetching task info or subtasks:', error);
    } finally {
      setLoading(false);
    }
  }, [taskGid, setLoading]);

  useEffect(() => {
    fetchTaskInfo();
  }, [fetchTaskInfo]);

  const handleEditClickComment = (comment) => {
    setEditableCommentId(comment.gid);
    setEditedText(comment.text);
  };

  const handleUpdateComment = async (storyGid) => {
    try {
      setLoading(true);
      const storyData = { text: editedText };
      await updateAsanaTaskStory(storyGid, storyData);
      setComments(
        comments.map((comment) =>
          comment.gid === storyGid ? { ...comment, text: editedText } : comment
        )
      );
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
      setComments(comments.filter((comment) => comment.gid !== storyGid));
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
      const newComment = await createAsanaTaskStory(taskGid, storyData);
      setComments([...comments, newComment]);
      setNewCommentText("");
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleClick = async (subTask, e) => {
    e.preventDefault();
    try {
      const subTaskComments = await getAsanaTaskDetails(subTask.gid);
      setSelectedTask({ subTask, comments: subTaskComments.stories.data, subTaskSubTask: subTaskComments.data.data.subtasks });
    } catch (error) {
      console.error('Error fetching subtask comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubTaskClick = (subTask) => {
    setEditTaskId(subTask.gid);
    setEditedNotes({ notes: subTask.notes });
  };

  const editTask = async (taskId, updatedFields) => {
    try {
      await updateTask(taskId, updatedFields);
      await fetchTaskInfo();
    } catch (error) {
      console.error('Error updating task notes:', error);
    }
  };

  const handleSaveClick = async (subTask, editedNotes) => {
    try {
      setTaskLoading({ ...taskLoading, [`save_${subTask.gid}`]: true });
      await editTask(subTask.gid, editedNotes);
      setTaskDetails((prevTaskDetails) => ({
        ...prevTaskDetails,
        subtasks: prevTaskDetails.subtasks.map((st) =>
          st.gid === subTask.gid ? { ...st, ...editedNotes } : st
        ),
      }));
      setEditTaskId(null);
      setEditedNotes({});
    } catch (error) {
      console.error('Error saving subtask:', error);
    } finally {
      setTaskLoading({ ...taskLoading, [`save_${subTask.gid}`]: false });
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setTaskLoading({ ...taskLoading, [`delete_${taskId}`]: true });
      await deleteTaskAsana(taskId);
      await fetchTaskInfo();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setTaskLoading({ ...taskLoading, [`delete_${taskId}`]: false });
    }
  };

  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleCloseDetailView = () => {
    setSelectedTask(null);
  };

  const handleFilterInputChange = (e) => {
    setFilterInput(e.target.value);
  };

  const handleNotesChange = (event) => {
    setEditedNotesTextArea(event.target.value);
  };

  const handleNotesBlur = async () => {
    try {
      if (isEditingNotes && taskDetails && editedNotesTextArea.trim() !== taskDetails.notes.trim()) {
        setLoading(true);
        await editTask(taskDetails.gid, { notes: editedNotesTextArea });
        setTaskDetails((prevTaskDetails) => ({
          ...prevTaskDetails,
          notes: editedNotesTextArea,
        }));
      }
    } catch (error) {
      console.error('Error updating task notes:', error);
    } finally {
      setLoading(false);
      setIsEditingNotes(false);
    }
  };

  const filteredSubtasks = taskDetails
    ? taskDetails.subtasks.filter(
      (subTask) =>
        !filterInput ||
        (subTask.assignee &&
          subTask.assignee.name.toLowerCase().includes(filterInput.toLowerCase()))
    )
    : [];

  return (
    <div className="task-container">
      {taskInfo && (
        <div className="task-info">
          {
            taskInfo.memberships?.[0]?.project?.name &&
            <h1>
              {taskInfo.memberships?.[0]?.project?.name} ({taskInfo.memberships?.[0]?.section?.name})
            </h1>
          }
          {
            taskInfo?.name &&
            <h2>{taskInfo.name}</h2>
          }
          {
            taskInfo?.assignee?.name &&
            <p>
              <strong>Assignee: </strong>
              {taskInfo.assignee?.name}
            </p>

          }
          {
            taskInfo?.created_at &&
            <p>
              <strong>Created at:</strong> {taskInfo.created_at && dateAndTimeConverter(taskInfo.created_at)}
            </p>
          }
          {
            taskInfo?.due_on &&
            <p>
              <strong>Due on:</strong> {taskInfo.due_on}
            </p>
          }
          {
            taskInfo?.followers &&
            <p>
              <strong>Followers:</strong> {taskInfo.followers?.map((follower) => follower.name).join(', ')}
            </p>
          }
          {
            taskInfo?.permalink_url &&
            <p>
              <strong>Asana page link:</strong>{' '}
              {taskInfo.permalink_url && (
                <a style={{ color: 'blue', textDecoration: 'underline' }} href={taskInfo.permalink_url}>
                  link
                </a>
              )}
            </p>
          }
          {
            taskInfo?.workspace?.name &&
            <p>
              <strong>Workspace:</strong> {taskInfo.workspace?.name}
            </p>
          }
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <MoonLoader color="#ffffff" size={75} />
        </div>
      ) : (
        <>
          <section>
            <div className='search-by-entering-name'>
              <div className='search'>
                <input
                  type="text"
                  placeholder="Filter by assignee name"
                  value={filterInput}
                  onChange={handleFilterInputChange}
                  className="filter-input"
                />
                <PersonSearchIcon style={{ fontSize: 30 }} />
              </div>
            </div>
          </section>
          <section className='description'>
            <div className='w-full'>
              <h2 style={{ fontWeight: 600, textDecoration: "underline" }}>Description</h2>
              <textarea
                placeholder="What is the Task about?"
                value={editedNotesTextArea}
                onChange={handleNotesChange}
                onBlur={handleNotesBlur}
                onFocus={() => setIsEditingNotes(true)}
                className='w-full p-4 border border-black italic-placeholder'
                style={{ height: "200px", backgroundColor: "#E1E1E1", borderRadius: "20px" }}
              />
            </div>
          </section>
          {
            filteredSubtasks.length > 0 &&
            <div className="task-details">
              {filteredSubtasks.map((subTask) => (
                <LazyLoadedBox
                  key={subTask.gid}
                  subTask={subTask}
                  editedName={editedName}
                  task={taskDetails}
                  editTaskId={editTaskId}
                  editedNotes={editedNotes}
                  taskLoading={taskLoading}
                  textareaRef={textareaRef}
                  setEditedName={setEditedName}
                  handleTitleClick={handleTitleClick}
                  handleEditClick={handleEditSubTaskClick}
                  handleSaveClick={handleSaveClick}
                  deleteTask={deleteTask}
                  setEditedNotes={setEditedNotes}
                  adjustTextareaHeight={adjustTextareaHeight}
                />
              ))}
            </div>
          }
          <div className="comments-section">
            {comments.map(
              (comment) =>
                comment.type === 'comment' && (
                  <Comment
                    key={comment.gid}
                    comment={comment}
                    editableCommentId={editableCommentId}
                    editedText={editedText}
                    setEditedText={setEditedText}
                    handleUpdateComment={handleUpdateComment}
                    handleEditClickComment={handleEditClickComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                )
            )}
            <textarea
              className="full-width-textarea"
              placeholder="Add your comment here"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
            <button className="btn-add-comment" onClick={handleCreateComment}>
              Add Comment
            </button>
          </div>
        </>
      )}
      <TestingAndDefectFixingSideBar
        selectedTask={selectedTask}
        handleCloseDetailView={handleCloseDetailView}
      />
    </div>
  );
};

export default TestingAndDefectFixing;
