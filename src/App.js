import React, { useState, useEffect } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
import { collection, getDocs } from 'firebase/firestore';
import Post from './components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './feature/post.slice';

const App = () => {
  const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);
  const posts = useSelector( (state) =>  state.posts.posts);

  const dispatch = useDispatch();

  // const [userDb, setUserDb] = useState([]);
  // const usersdbCollection = collection(db, 'posts')

  useEffect(() => {
    getDocs(collection(db, 'posts')).then((res) =>
      dispatch(getPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    );
  }, []);

  // check if user is connect this method allow to get all connect data from user
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Disconnect user with fireBase
  const handleLogOut = async () => {
    await signOut(auth)
  };

  return (
    <div>
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName} </h4>
            <button onClick={handleLogOut}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        )}

        {user ? (
          <CreatePost uid={user.uid} displayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
      </div>
      <div className="posts-container">
        {user && posts &&
          [...posts]
            .sort((a, b) => b.date - a.date)
            .map((post) => <Post post={post} key={post.id} user={user} />)}
      </div>
    </div>
  );
};

export default App;
