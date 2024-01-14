import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './features/toggle/toggleSlice';
import userReducer from './features/user/userSlice';

export default configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userReducer,
    // Add other reducers if needed
  },
});