import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/login/LoginSlice';
import dataSourceSlice from '../pages/internal/config/data-sources/DataSourceSlice';
import userSettingSlice from '../pages/internal/config/user-settings/UserSettingSlice';
import JobSlice from '../pages/internal/jobs/JobSlice';
export default configureStore({
  reducer: {
    loginStore:loginSlice,
    dataStoreSource:dataSourceSlice,
    userStoreSetting:userSettingSlice,
    jobStore:JobSlice,
  },
})