import { useRef, useState, useEffect } from "react";

import Todo from "./todo";

import {
  uuidv4,
  getList,
  saveList,
  deleteList,
} from "../support/todos-service";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [reset, setReset] = useState(false);

  const inputEl = useRef("");

  const addTodos = async () => {
    const data = inputEl.current.value;
    if (!data) {
      return;
    }

    const lastPosition =
      reset || !todos.length ? 0 : todos[todos.length - 1].position + 1;
    const items = data.split("\n").reduce((accu, item, position) => {
      const todo = item.trim();
      if (!todo) {
        return accu;
      }

      accu.push({
        todo,
        uuid: uuidv4(),
        position: lastPosition + position,
      });

      return accu;
    }, []);

    const list = (reset ? [...items] : [...todos, ...items]).map(
      (item, index) => ({
        ...item,
        position: index,
      })
    );

    if (reset) {
      deleteList(todos);
    }

    setReset(false);
    setTodos(list);
    inputEl.current.value = "";

    saveList(items).then((responses) => {
      if (responses.find((response) => response.status >= 400)) {
        alert("🔴 Error: list not saved 😔");
      }
    });
  };

  const addClickHandler = async () => {
    addTodos();
  };

  const resetClickHandler = () => {
    inputEl.current.value = "";

    if (!reset) {
      todos.forEach((todo) => {
        inputEl.current.value += todo.todo + "\n";
      });
    }

    setReset(!reset);
  };

  const trashClickHandler = () => {
    if (reset) {
      return;
    }

    if (!confirm("are you sure?")) {
      return;
    }

    setTodos([]);

    deleteList(todos).then((responses) => {
      if (responses.find((response) => response.status >= 400)) {
        alert("🔴 Error: list not deleted 😔");
      }
    });
  };

  const removeTodo = (uuid) => {
    setTodos(todos.filter((todo) => todo.uuid !== uuid));
  };

  const moveToBottom = (uuid, state) => {
    if (!state) {
      const item = todos.find((todo) => todo.uuid === uuid);
      item.state = !item.state;

      const items = todos.filter((todo) => todo.uuid !== uuid);
      setTodos([...items, item]);
      return;
    }

    const items = todos.map((todo) => {
      if (todo.uuid === uuid) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(items);
  };

  const init = async () => {
    const items = await getList();

    setTodos(items);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <textarea ref={inputEl}></textarea>
      <button className="cta-button" onClick={addClickHandler}>
        add
      </button>
      {todos.length ? (
        <div className="edit-container">
          <button
            className={`cta-button ${reset && " cta-button-active"}`}
            onClick={resetClickHandler}
            style={{ marginRight: 12 }}
          >
            🔁
          </button>
          <button
            onClick={trashClickHandler}
            style={{
              display: "inline-block",
              padding: 6,
              border: "1px solid #ff3e00",
              fontSize: 20,
              width: 40,
              background: "none",
              cursor: "pointer",
            }}
          >
            🗑️
          </button>
        </div>
      ) : null}
      <div className="list">
        {!reset &&
          todos.map((todo) => (
            <Todo
              key={todo.uuid}
              value={todo.todo}
              state={todo.state}
              uuid={todo.uuid}
              position={todo.position}
              onDelete={removeTodo}
              moveToBottom={moveToBottom}
            />
          ))}
      </div>

      <style jsx>{`
        textarea,
        input[type="text"] {
          padding: 4px;
          font-size: 30px;
        }

        textarea {
          padding: 4px;
          font-size: 20px;
          min-height: 200px;
          width: 100%;
          border: 1px solid #ff3e00;
        }

        .cta-button {
          display: inline-block;
          padding: 6px;
          border: 1px solid #ff3e00;
          font-size: 20px;
          text-transform: uppercase;
          text-align: center;
          width: 100%;
          background: none;
        }

        .cta-button:hover {
          cursor: pointer;
        }

        .cta-button-active {
          background-color: #ff3e00;
        }

        .edit-container {
          display: flex;
          justify-content: right;
          align-items: center;
          margin-top: 12px;
        }

        .edit-container button {
          width: 40px;
        }

        .list {
          padding: 12px 0;
        }
      `}</style>
    </div>
  );
}
