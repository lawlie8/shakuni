import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/login/LoginSlice';
export default configureStore({
  reducer: {
    login:loginSlice,
  },
})