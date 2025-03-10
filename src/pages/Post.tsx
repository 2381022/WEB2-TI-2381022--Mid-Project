import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance"
import {useNavigate} from "react-router-dom";

interface postData {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: reactionType,
  views: number,
  userId: number
}

interface reactionType {
  likes: number,
  dislikes: number
}

interface postList {
  posts: postData[]
}

const fetchPostData = async () => {
  return await axios.get<postList>("/post");
}


interface DeletedPost extends postData {
  isDeleted: Boolean;
  deletedOn: string;
}

const deletePost = async (id: string | undefined) => {
  return await axios.delete<DeletedPost>(`post/${id}`);
};

const PostCard : React.FC<postData> = (post : postData) =>{
  const deletePostMutation = useMutation({
    mutationFn: (id : string) => deletePost(id)
  });
  const navigate = useNavigate();
  return(
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <p className="text-gray-700 text-sm">Anonymous {post.userId}</p>
        </div>
        <div className="relative group">
          <button>
            <svg className="w-5 h-5 text-gray-500 hover:text-gray-800 transition-colors" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-32 hidden group-focus-within:block">
            <button
              onClick={() => {
                navigate(`${post.id}/edit`);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => {
                if (confirm("Are you sure want to delete this post ? ")) {
                  deletePostMutation.mutate(post.id.toString());
                }
                return;
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <div className="flex flex-wrap gap-2 text-gray-500 text-sm mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="bg-gray-100 rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <div>
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
          </svg>
          {post.views} Views
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"></path>
            </svg>
            {post.reactions.likes}
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" ></path>
            </svg>
            {post.reactions.dislikes}
          </div>
        </div>
      </div>
    </div>
  );
}

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
      <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
}

const Post = () => {
  const getPostData = useQuery({ queryKey: ["postDat"], queryFn: fetchPostData });
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Posts</h1>
          <button
            className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => navigate("./add")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {getPostData.isFetching ? (
            Array.from({length: 4}).map((_,index) => <PostSkeleton key={index}/>)
          )  :
            getPostData.data?.data.posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Post