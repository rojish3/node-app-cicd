import React, { useState, FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface TodoInputProps {
  addTodo: (todo: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <AiOutlinePlus
        size={20}
        className="absolute text-gray-500 left-2 top-3"
      />

      <input
        type="text"
        className=" block px-8 py-2 mb-8 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-500"
        placeholder="Add a task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default TodoInput;
