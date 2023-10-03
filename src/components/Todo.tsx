import React from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
}

interface ToDoProps {
  task: Task;
  toggleComplete: () => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

const Todo: React.FC<ToDoProps> = ({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className="bg-blue-700 text-white text-lg w-full my-2 px-4 py-2 rounded-lg flex justify-between items-center cursor-pointer shadow-lg">
      <p
        onClick={toggleComplete}
        className={task.completed ? "line-through" : ""}
      >
        {task.task.trim() !== " " ? task.task : null}
        {/* <p className="text-xs">{formattedTime}</p> */}
      </p>
      <div className="flex gap-4">
        <AiFillEdit onClick={() => editTodo(task.id)} />
        <FaTrash onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Todo;
