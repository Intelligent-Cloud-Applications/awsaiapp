import React,{useContext,useMemo} from 'react';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';


const Comment = ({
  comment,
  editableCommentId,
  editedText,
  setEditedText,
  handleUpdateComment,
  handleEditClickComment,
  handleDeleteComment,
}) => {
  const { linkify, dateAndTimeConverter } = useContext(PendingTasksContext);

  const processedText = useMemo(() => linkify(comment.text), [comment.text,linkify]);

  return (
    <div className="comment">
      <div className="comment-header">
        <p><strong>{comment.created_by.name}</strong></p>
      </div>
      <p><em>{dateAndTimeConverter(comment.created_at)}</em></p>
      {editableCommentId === comment.gid ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-textarea"
          style={{ padding: 5, borderRadius: 10 }}
        />
      ) : (
        <div className="comment-text">
          <p dangerouslySetInnerHTML={{ __html: processedText }}></p>
        </div>
      )}
      <div className="comment-actions">
        {editableCommentId === comment.gid ? (
          <Save style={{ cursor: "pointer" }} onClick={() => handleUpdateComment(comment.gid)}>Save</Save>
        ) : (
          <EditNoteIcon style={{ cursor: "pointer" }} onClick={() => handleEditClickComment(comment)}>Edit</EditNoteIcon>
        )}
        <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteComment(comment.gid)}>Delete</DeleteIcon>
      </div>
    </div>
  );
};

export default Comment;