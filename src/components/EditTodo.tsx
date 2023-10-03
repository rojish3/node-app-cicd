import React, { useState } from "react";

interface Task {
  id: string;
  task: string;
  completed: boolean;
  createdAt?: Date;
  isEditing: boolean;
}

interface EditTodoProps {
  editTodo: (task: string, id: string) => void;
  task: Task;
}

const EditTodo: React.FC<EditTodoProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue("");
  };

  return (
    <form className="flex items-center w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="px-4 py-2 mb-8 w-full text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Update Task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <button type="submit" className="bg-blue  -700">
        Update Task
      </button> */}
    </form>
  );
};

export default EditTodo;
