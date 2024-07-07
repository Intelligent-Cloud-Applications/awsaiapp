import React, { useContext, useMemo } from 'react';
import { PendingTasksContext } from '../context/PendingTasksProvider';
import CircularIntegration from './CircularIntegration';

const Comment = React.memo(({
  comment,
  editableCommentId,
  editedText,
  setEditedText,
  handleUpdateComment,
  handleEditClickComment,
  handleDeleteComment,
}) => {
  const { linkify, dateAndTimeConverter } = useContext(PendingTasksContext);

  const processedText = useMemo(() => linkify(comment.text), [comment.text, linkify]);
  const user = localStorage.getItem('userGid')

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
      {comment.created_by.gid === user &&
        <div className="comment-actions items-center">
          {editableCommentId === comment.gid ? (
            <CircularIntegration style={{ cursor: "pointer" }} onClick={() => handleUpdateComment(comment.gid)} actionType={`save`}>Save</CircularIntegration>
          ) : (
            <CircularIntegration style={{ cursor: "pointer" }} onClick={() => handleEditClickComment(comment)} actionType={`edit`}>Edit</CircularIntegration>
          )}
          <CircularIntegration style={{ cursor: "pointer" }} onClick={() => handleDeleteComment(comment.gid)} actionType={`delete`}>Delete</CircularIntegration>
        </div>

      }
    </div>
  );
});

export default Comment;