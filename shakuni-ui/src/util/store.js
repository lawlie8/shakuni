import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../pages/login/LoginSlice';
import dataSourceSlice from '../pages/internal/config/data-sources/DataSourceSlice';
export default configureStore({
  reducer: {
    login:loginSlice,
    dataSource:dataSourceSlice,
  },
})