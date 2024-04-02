import { EditTodoProps, TodoState } from "@/types/todo.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

let nextTodoId: number = 1;

const todoInitialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: nextTodoId++,
        name: action.payload,
      });
    },
    editTodo: (state, action: PayloadAction<EditTodoProps>) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo;
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
