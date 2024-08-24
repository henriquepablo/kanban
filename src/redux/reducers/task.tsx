//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

export const createTask = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        tasks: (state, action:string) => {
            state.push(action.payload);
        }
    }
});

export const {tasks} = createTask.actions;
export default createTask.reducer;