import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./features/counter/counterSlice";
import weatherReducer from "./features/weatherApi/weatherApiSlice";
import todoReducer from "./features/todo/todoSlice";
import petsApiReducer from "./features/petsApi/petsSlice";
import crudReducer from "./features/mernCrudTable/crudSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weatherApi: weatherReducer,
    todo: todoReducer,
    pets: petsApiReducer,
    crud: crudReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
