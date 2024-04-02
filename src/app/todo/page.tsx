"use client";

import React, { useState } from "react";
import { EditTodoProps } from "@/types/todo.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTodo, editTodo, removeTodo } from "@/redux/features/todo/todoSlice";

const TodoComponent = () => {

  const { todos } = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  const [text, setText] = useState<string>("");
  const [editText, setEditText] = useState<EditTodoProps | null>(null);

  const handleAddTodo = (): void => {
    dispatch(addTodo(text));
    setText("");
  };

  const handleEdiClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: EditTodoProps): void => {
    setEditText(item);
  };

  const handleEditTodo = (): void => {
    if (editText) {
      const payload = {
        id: editText.id,
        name: editText.name
      };
      dispatch(editTodo(payload));
      setEditText(null)
    }
  };


  const handleRemoveTodo = (id: number): void => {
    dispatch(removeTodo(id));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>

        <br />
        <br />

        {todos?.map((item: EditTodoProps, index: number): React.JSX.Element => (
          <ul key={index}>
            <li>
              {item.id} - {item.name}

              {editText?.id == item.id ? (

                <div>
                  <input
                    type="text"
                    value={editText?.name}
                    onChange={(e) => setEditText({ ...editText, name: e.target.value })}
                  />
                  <button onClick={handleEditTodo}>Edit Todo</button>
                </div>
              ) : (
                <button onClick={(e) => handleEdiClick(e, item)}>Edit</button>
              )}
              <button onClick={() => handleRemoveTodo(Number(item.id))}>Remove</button>
            </li>
          </ul>
        ))}

      </div>
    </div>
  );
};

export default TodoComponent;
