import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useRef, useEffect } from 'react';
import { auth, db } from '../utils/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import CommentCard from './CommentCard';
import { useDispatch } from 'react-redux';
import { addComment } from '../feature/post.slice';

const CommentPost = ({ post }) => {
  const [user, setUser] = useState(null);
  const comment = useRef();
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault();
    let data = [];

    if (post.comments === null) {
      data = {
        commentAuthor: user.displayName,
        text: comment.current.value,
      };
    } else {
      data = [
        ...post.comments,
        {
          commentAuthor: user.displayName,
          text: comment.current.value,
        },
      ];
    }

    updateDoc(doc(db, 'posts', post.id), { comments: data }).then(()=> {
      dispatch(addComment([post.id, data]))
    })
    comment.current.value = '';
  };

  useEffect(() => {
    // // check if user is connect this method allow to get all connect data from user
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="comment-container">
      <h5 className="comment-title">Comments</h5>
      {post.comments &&
        post.comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      {user ? (
        <form onSubmit={handleComment}>
          <textarea placeholder="Send a comment" ref={comment}></textarea>
          <input type="submit" value="Send" />
        </form>
      ) : (
        <p>You must to be connnect to post a comment</p>
      )}
    </div>
  );
};

export default CommentPost;
