import React, { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import EditTodo from "../components/EditTodo";
import Todo from "../components/Todo";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineSearch } from "react-icons/ai";
// import SearchTodo from "../components/SearchTodo";
uuidv4();

interface Task {
  id: string;
  task: string;
  completed: boolean;
  createdAt?: Date;
  isEditing: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Task[]>([]);

  // useEffect(() => {
  //   // Load todos from local storage when the component mounts
  //   const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  //   setTodos(storedTodos);
  // }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(
      todos.filter((todo) =>
        todo.task.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);

  const storeItems = (items) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  const addTodo = (todo: string) => {
    const updatedTodos = setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    storeItems(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    storeItems(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = setTodos(todos.filter((todo) => todo.id !== id));
    storeItems(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="bg-gray-200 h-screen pt-20">
      <div className="container bg-white p-4 h-auto w-[450px] m-auto pt-8 flex flex-col justify-center items-center rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">To Do App</h1>
        {/* <SearchTodo /> */}
        <div className="relative w-full">
          <AiOutlineSearch
            size={20}
            className="absolute text-gray-500 left-2 top-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="block px-8 py-2 mb-8 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <h2 className="font-bold">To Do Lists:</h2>
        {filteredTodos.map((todo) =>
          todo.isEditing ? (
            <EditTodo key={todo.id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              key={todo.id}
              toggleComplete={() => toggleComplete(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={() => editTodo(todo.id)}
            />
          )
        )}
        <TodoInput addTodo={addTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
