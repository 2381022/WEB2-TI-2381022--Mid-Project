import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Todo {
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoFormFields {
  todo: string;
  userId: number;
}

interface TodoFormElementProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, Todo, unknown>;
  defaultInputData?: Todo;
}

const TodoForm: React.FC<TodoFormElementProps> = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TodoFormFields>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("todo", props.defaultInputData.todo);
      setValue("userId", props.defaultInputData.userId);
    }
  }, [props.defaultInputData, setValue]);

  const submitHandler = (data: TodoFormFields) => {
    if (props.isEdit) {
      if (!confirm("Are you sure want to update todo data ? ")) return;
    }

    const newTodoDat: Todo = {
      todo: data.todo,
      userId: data.userId,
      completed: false,
    };

    props.mutateFn(newTodoDat);
  };

  return (
    <form className="flex flex-col space-y-6 p-6 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="todo">
          Todo Body
        </label>
        <textarea
          id="todo"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          {...register("todo", { required: "Todo body is required." })}
        />
        {errors.todo && <p className="text-red-500 italic text-xs mt-1">{errors.todo.message}</p>}
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userId">
          User ID
        </label>
        <input
          type="number"
          id="userId"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          {...register("userId", { required: "userId is required." })}
        />
        {errors.userId && <p className="text-red-500 italic text-xs mt-1">{errors.userId.message}</p>}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {props.isEdit ? "Save Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;