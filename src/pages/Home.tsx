import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface TodoItem {
  //   id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  //   const [todos, setTodos] = useState<TodoItem[]>([]);

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [addTodo, setAddTodo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);

  //   const addTodos = (todo: TodoItem) => {
  //     const updatedList = [...todos, todo];
  //     localStorage.setItem("todos", JSON.stringify(updatedList));
  //   };
  const toggleComplete = (index: number) => {
    const updatedList = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedList);
    localStorage.setItem("todos", JSON.stringify(updatedList));
  };

  const deleteTodo = (index: number) => {
    const updatedList = setTodos(todos.filter((todo, idx) => idx !== index));
    localStorage.setItem("todos", JSON.stringify(updatedList));
  };

  return (
    <div className="container bg-white p-4 h-auto w-[450px] m-auto pt-8 flex flex-col justify-center items-center rounded-xl shadow">
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 mb-8 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <p>Todos</p>
      {filteredTodos.map((todo, idx) => (
        <div
          key={idx}
          onClick={() => toggleComplete(idx)}
          className={`bg-blue-700 text-white text-lg w-full my-2 px-4 py-2 rounded-lg flex justify-between items-center cursor-pointer shadow-lg ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.text}
          <span onClick={() => deleteTodo(idx)}>
            <FaTrash className="z-10 cursor-pointer hover:scale-110" />
          </span>
        </div>
      ))}
      {/* <button
        className="bg-gray-200 px-3 py-1 rounded-lg flex justify-end"
        onClick={setTodos()}
      >
        Clear All
      </button> */}
      <input
        type="text"
        placeholder="Add todos"
        className="px-4 py-2 my-4 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        value={addTodo}
        onChange={(e) => setAddTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTodos([...todos, { text: addTodo, completed: false }]);
            // addTodos(newToDos);
            setAddTodo("");
          }
        }}
      ></input>
    </div>
  );
};

export default Home;
