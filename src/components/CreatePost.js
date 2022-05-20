import React, { useRef } from 'react';

const CreatePost = ({ uid, displayName }) => {
  const message = useRef('');

  const handlePost = async (e) => {
    e.prevenDefault();
    const data = {
        author : displayName,
        authorId: uid,
        message: message.current.value,
        comments: null,
        date: Date.now()

    }
    console.log(data);

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
