import { useEffect, useState } from "react";

interface TodoItem {
  //   id: number;
  text: string;
  completed: boolean;
}

const SearchTodo = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 mb-8 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </>
  );
};

export default SearchTodo;
