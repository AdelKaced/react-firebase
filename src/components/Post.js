import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../utils/firebase.config';
import CommentPost from './CommentPost';
import Delete from './Delete';

const Post = ({ post, user }) => {
  const [edit, setEdit] = useState(false);
  const [editMess, setEditMess] = useState(post.message);

  const dateFormater = (date) => {
    // transform date in day
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  };

  const handleEdit = () => {
    setEdit(false);
    editMess && updateDoc(doc(db, 'posts', post.id), { message: editMess });
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5> Posted {dateFormater(post.date)}</h5>
        </div>
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={() => setEdit(!edit)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <Delete postId={post.id} />
          </div>
        )}
      </div>
      {edit ? (
        <>
          <textarea
            autoFocus
            value={editMess}
            onChange={(e) => setEditMess(e.target.value)}
          >
            {' '}
          </textarea>
          <button className="edit-btn" onClick={handleEdit}>
            Modifier Message
          </button>
        </>
      ) : (
        <p>{editMess}</p>
      )}
      test message
      <CommentPost post={post}/> 
    </div>
  );
};

export default Post;
