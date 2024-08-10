import React, { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [editTodoInput, setEditTodoInput] = useState("");

  function addTodo(e) {
    e.preventDefault();
    if (todoInput.trim() !== "") {
      const updatedtodos = [...todos, { text: todoInput, checked: false }];
      setTodos(updatedtodos);
      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      setTodoInput("");
    }
  }

  function editTodo(CurrentId) {
    setEdit({ isEdit: true, id: CurrentId });
    const currentval = todos[CurrentId].text;
    setEditTodoInput(currentval);
  }

  function saveTodo(CurrentId) {
    const todocopy = [...todos];
    if (editTodoInput.trim() !== "") {
      todocopy[CurrentId].text = editTodoInput;
      setTodos(todocopy);
      localStorage.setItem("todos", JSON.stringify(todocopy));
    }
    setEditTodoInput("");
    setEdit(false);
  }

  function deleteTodo(CurrentId) {
    const todoCopy = [...todos];
    todoCopy.splice(CurrentId, 1);
    setTodos(todoCopy);
    //setTodos(todos.filter((_, i) => i !== id));
    localStorage.setItem("todos", JSON.stringify(todoCopy));
  }

  function handleCheck(CurrentId) {
    const todoCopy = [...todos];
    todoCopy[CurrentId].checked = !todoCopy[CurrentId].checked;
    setTodos(todoCopy);
    localStorage.setItem("todos", JSON.stringify(todoCopy));
  }

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todos"));
    if (todoList) {
      setTodos(todoList);
    }
  }, []);

  console.log(todos);
  console.log(todoInput);

  return (
    <>
      <div className="min-w-[350px] max-w-[570px] h-[650px] bg-purple-700 mx-auto p-2 py-9 rounded-lg">
        <div className="">
          <form onSubmit={addTodo} className=" flex gap-3 justify-center">
            <input
              type="text"
              className="border-none focus:outline-none h-9 w-[350px] p-1 pl-3 bg-black/40 rounded-xl"
              placeholder="add todo..."
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button
              onClick={addTodo}
              className="btn-add w-12 active:text-gray-400 font-medium"
            >
              add
            </button>
          </form>
        </div>
        <div className=" flex flex-col gap-3 mx-10 mt-12">
          {todos.map((todo, index) => (
            <div key={index} className="flex justify-between">
              {edit.isEdit && edit.id === index ? (
                <input
                  type="text"
                  className="border-none focus:outline-none h-[35px] w-[320px] p-1 pl-3 bg-black/40 rounded-xl"
                  placeholder="edit todo..."
                  value={editTodoInput}
                  onChange={(e) => setEditTodoInput(e.target.value)}
                />
              ) : (
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheck(index)}
                  />
                  <p className={todo.checked && "line-through"}>{todo.text}</p>
                </div>
              )}

              <div className="flex gap-3">
                {edit.isEdit && edit.id === index ? (
                  <button
                    onClick={() => saveTodo(index)}
                    className="btn-add px-2 font-medium text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editTodo(index)}
                    className="btn-add px-2 font-medium text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(index)}
                  className="btn-add px-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
