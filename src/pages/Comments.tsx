import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';

interface Comment {
    id : number,
    body : string,
    postId : number,
    likes : number
    user : {
      id : number,
      username : string,
      fullName : string
    }
}

interface Comments{
    comments : Comment[]
}

interface DeletedComment extends Comment {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchCommentsDat = async () => {
    return axios.get<Comments>('/comments')
}

const deleteComments = async (id: string | undefined) => {
    return await axios.delete<DeletedComment>(`comments/${id}`);
};

const CommentsSkeleton = () => {
  return(
    <div className='flex flex-col space-y-3 mt-2'>
      <div className='flex items-center space-x-2'>
        <div>
          <div className="bg-gray-200 animate-pulse h-10 w-10 rounded-full"></div>
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <div className='flex w-full justify-between items-center'>
            <div className="bg-gray-200 animate-pulse h-4 w-24 rounded-xl"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-4 rounded-full mr-1"></div>
          </div>
          <div className="bg-gray-200 animate-pulse h-2 w-16 rounded-xl"></div>
        </div>
      </div>

      <div>
        <div className="bg-gray-200 animate-pulse h-4 w-72 rounded-xl"></div>
      </div>
      <div className='flex flex-col space-y-1'>
        <div className="bg-gray-200 animate-pulse h-1 w-full rounded-xl"></div>
      </div>
    </div>
  );
}

const Comments = () => {
    const getCommentDat = useQuery({
        queryKey : ["comments"],
        queryFn : fetchCommentsDat
    });

    const deleteCommentDat = useMutation(
        {mutationFn : (id : string) => deleteComments(id)}
    )

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <button
        className="fixed bottom-4 right-4 bg-black text-white rounded-full p-3 shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-10"
        onClick={() => navigate("./add")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8">Comments</h2>
        <div className="flex flex-col gap-6 px-4 max-w-3xl mx-auto w-full">
          {getCommentDat.isFetching ? (
            Array.from({ length: 3 }).map((_, index) => <CommentsSkeleton key={index} />)
          ) : (
            getCommentDat.data?.data.comments.map((comment) => (
              <div key={comment.id} className='flex flex-col space-y-3 border border-gray-200 rounded-md shadow-sm p-4'>
                <div className='flex items-center space-x-2'>
                  <svg className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full" data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <div className='flex flex-col w-full'>
                    <div className='flex w-full justify-between items-center'>
                      <p className='font-medium'>{comment.user.fullName}</p>
                      <div className="relative group z-0">
                          <button>
                              <svg className="w-6 text-gray-500 hover:text-black rounded-full p-1 transition-colors" data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                          </button>
                          <div className="absolute bottom-0 right-8 bg-white border border-gray-200 rounded-md shadow-md w-32 hidden group-focus-within:block">
                              <button onClick={() => {
                                  navigate(`${comment.id}/edit`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none">
                                  Edit
                              </button>
                              <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                              onClick={() => {
                                  if (confirm("Are you sure want to delete this comment ? ")) {
                                    deleteCommentDat.mutate(comment.id.toString());
                                  }
                                  return;
                              }}
                              >
                              Delete
                              </button>
                          </div>
                      </div>
                    </div>
                    <p className='text-xs italic text-gray-500'>@{comment.user.username} - {comment.user.id}</p>
                  </div>
                </div>

                <div>
                  <p>{comment.body}</p>
                </div>
                <div className='flex flex-col'>
                  <hr className="border-gray-200"/>
                  <p className='text-right text-sm text-gray-500'>{comment.id}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments