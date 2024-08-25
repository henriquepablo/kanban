//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

export const createTask = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        tasks: (state, action:string) => {
            state.push(action.payload);
        },

        removeTask: (state, action) => {
            state.splice(action.payload, 1);
        }
    }
});

export const {tasks, removeTask} = createTask.actions;
export default createTask.reducer;