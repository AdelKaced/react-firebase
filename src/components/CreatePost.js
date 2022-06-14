import React, { useRef } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../utils/firebase.config';
import { useDispatch } from 'react-redux';
import { addPost, getPosts } from '../actions/post.action';

const CreatePost = ({ uid, displayName }) => {
  const message = useRef('');
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();
    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now(),
    };
    console.log(data);
    // add element on the database
    await dispatch(addPost(data));
    message.current.value = '';
    dispatch(getPosts())
  };

  return (
    <div className="new-post-modal">
      <form onSubmit={handlePost}>
        <textarea placeholder="Message ...." ref={message}></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default CreatePost;
