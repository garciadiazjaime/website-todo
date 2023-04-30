import { useState } from "react";

import { updateTodo, deleteTodo } from "../support/todos-service";

export default function Todo(props) {
  const { value, state, uuid, position, moveToBottom } = props;
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(value);

  const updateHelper = () => {
    setEdit(!edit);

    updateTodo(todo, position, uuid).then((response) => {
      if (response.status >= 400) {
        alert("🔴 Error: item not updated 😔");
      }
    });
  };

  const checkClickHandler = () => {
    moveToBottom(uuid, state);
  };

  const deleteClickHandler = () => {
    if (!confirm("are you sure?")) {
      return
    }

    props.onDelete(uuid);

    deleteTodo(uuid, position).then((response) => {
      if (response.status >= 400) {
        alert("🔴 Error: item not deleted 😔");
      }
    });
  };

  const editClickHandler = () => {
    setEdit(!edit);
    if (edit) {
      updateHelper();
    }
  };

  const onChangeHandler = (event) => {
    setTodo(event.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      updateHelper();
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <div className="checkbox" onClick={checkClickHandler}>
          {state && "✔️"}
        </div>
        {edit ? (
          <input
            style={{ marginLeft: 12, height: 40, fontSize: 20 }}
            value={todo}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
          />
        ) : (
          <div style={{ marginLeft: 12 }}>{todo}</div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div
          className={`cta-button`}
          onClick={editClickHandler}
          style={{ marginRight: 12 }}
        >
          {edit ? "💾" : "✏️"}
        </div>
        <div className="cta-button" onClick={deleteClickHandler}>
          ❌
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: dotted #000 1px;
        }
        .checkbox {
          flex: 0 0 40px;
          height: 40px;
          border: 1px solid black;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26px;
          user-select: none;
        }
        .checkbox:hover {
          cursor: pointer;
        }
        .cta-button {
          border: 1px solid #ff3e00;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cta-button:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
