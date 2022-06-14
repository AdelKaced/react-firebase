import React, { useRef } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { useDispatch } from 'react-redux';
import { addPost, getPosts } from '../feature/post.slice';

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
    await addDoc(collection(db, 'posts'), data).then(() => {
      dispatch(addPost(data));
      getDocs(collection(db, 'posts')).then((res) =>
        dispatch(
          getPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
      );
    });
    message.current.value = '';
  };

  console.log(uid, displayName);
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
