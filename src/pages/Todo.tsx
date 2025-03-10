import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'

interface Todo {
    id : number,
    todo : string,
    completed : boolean,
    userId : number
}

interface TodoList{
    todos : Todo[]
}

interface DeletedTodo extends Todo {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchTodoList = async () => {
    return axios.get<TodoList>('/todo')
}

const deleteTodo = async (id: string | undefined) => {
    return await axios.delete<DeletedTodo>(`todo/${id}`);
};

const TodoSkeleton = () => {
    return (
        <div className='flex flex-col space-y-3 mt-2 rounded-md shadow-sm p-4 bg-white'>
            <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                    <div className="bg-gray-200 animate-pulse h-5 w-5 rounded-sm"></div>
                    <div className="bg-gray-200 animate-pulse h-5 w-48 rounded-xl"></div>
                </div>
                <div className="bg-gray-200 animate-pulse h-5 w-5 rounded-full mr-1"></div>
            </div>
            <hr className="border-gray-200"/>
            <div className='flex justify-end'>
                <div className="bg-gray-200 animate-pulse h-3 w-8"></div>
            </div>
        </div>
    );
}

const Todo = () => {
    const getTodoList = useQuery({
        queryKey : ["Todo"],
        queryFn : fetchTodoList
    });

    const deleteTodoMutation = useMutation(
        {mutationFn : (id : string) => deleteTodo(id)}
    )

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Todos</h1>
          <button
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("./add")}
          >
            Add Todo
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {getTodoList.isFetching ? (
            Array.from({ length: 6 }).map((_, index) => <TodoSkeleton key={index} />)
          ) : (
            getTodoList.data?.data.todos.map((Todo) => (
              <div key={Todo.id} className='bg-white rounded-md shadow-sm p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex space-x-2 items-center'>
                    <input type="checkbox" disabled checked={Todo.completed} />
                    <p className={
                      !Todo.completed ? 'text-lg font-medium text-gray-800':
                      'text-lg font-medium line-through text-gray-500'

                    }>{Todo.todo}</p>
                  </div>

                  <div className="relative group z-0">
                    <button>
                      <svg className="w-5 text-gray-500 hover:text-gray-800 rounded-full p-1 transition-colors" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="absolute bottom-10 right-0 bg-white border border-gray-200 rounded-md shadow-md w-32 hidden group-focus-within:block">
                      <button onClick={() => {
                          navigate(`${Todo.id}/edit`);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none">
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={() => {
                          if (confirm("Are you sure want to delete this todo ? ")) {
                            deleteTodoMutation.mutate(Todo.id.toString());
                          }
                          return;
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-200 mt-2"/>
                <div className='flex justify-end'>
                  <p className='text-xs text-gray-500'>User ID: {Todo.userId}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo