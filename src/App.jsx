import "./App.css";

import TodoList from "./TodoList";

function App() {
  return (
    <>
      <div className="">
        <div className="w-full flex justify-center text-3xl  py-1 pb-3 font-bold">
          Todo app
        </div>
        <div className="px-2">
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
