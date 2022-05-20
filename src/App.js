import React, { useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
// import {collection, getDocs} from 'firebase/firestore'

const App = () => {
  const [user, setUser] = useState(null);

  // const [userDb, setUserDb] = useState([]);
  // const usersdbCollection = collection(db, 'posts')

  // useEffect(() => {
  //   console.log('heueu')
  //   const getUsers = async () => {
  //     console.log('test')
  //     const data = await getDocs(usersdbCollection)
  //     console.log('data', data)
  //   };
  // }, []);

  // check if user is connect this method allow to get all connect data from user
  onAuthStateChanged(auth, (currentUser) => {
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
          <CreatePost uid={user.uid} 
          displayName={user.displayName} 
          />
        ) : (
          <ConnectModal />
        )}
      </div>
      <div className="posts-container"></div>
    </div>
  );
};

export default App;
