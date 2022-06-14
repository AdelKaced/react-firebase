import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/post.slice'

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
