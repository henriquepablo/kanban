import { configureStore } from "@reduxjs/toolkit";
import createTask  from "../reducers/task";

export default configureStore({
    reducer: {
        tasks: createTask,
    }
});