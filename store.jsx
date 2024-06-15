import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slice/table';

export const store = configureStore({
    reducer: {
        table: tableReducer,
    }
});