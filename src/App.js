import React, { useState, useEffect } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
// import { collection, getDocs } from 'firebase/firestore';
import Post from './components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './actions/post.action';

const App = () => {
  const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch()

  const posts = useSelector(state => state.postReducer)

  // const [userDb, setUserDb] = useState([]);
  // const usersdbCollection = collection(db, 'posts')

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line 
  }, []);

  // check if user is connect this method allow to get all connect data from user
  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    setUser(currentUser);
  });

  // Disconnect user with fireBase
  const handleLogOut = async () => {
    await signOut(auth);
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
        {user&&
        posts.length > 0 &&
          posts
          .sort((a,b)=> b.date - a.date)
            .map((post,index) => <Post post={post} key={post.id} user={user}/>)}
      </div>
    </div>
  );
};

export default App;
