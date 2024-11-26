import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/login/LoginSlice';
import dataSourceSlice from '../pages/internal/config/data-sources/DataSourceSlice';
import userSettingSlice from '../pages/internal/config/user-settings/UserSettingSlice';
export default configureStore({
  reducer: {
    login:loginSlice,
    dataSource:dataSourceSlice,
    userSetting:userSettingSlice,
  },
})