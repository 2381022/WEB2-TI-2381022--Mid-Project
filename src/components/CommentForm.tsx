import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Comment {
    body: string;
    postId: number;
    user: {
        id: number;
    };
}

interface CommentFormFields {
    body: string;
    postId: number;
    userId: number;
}

interface CommentFormProps {
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Comment, unknown>;
    defaultInputData?: Comment;
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CommentFormFields>();

    useEffect(() => {
        if (props.defaultInputData) {
            setValue("userId", props.defaultInputData.user.id);
            setValue("postId", props.defaultInputData.postId);
            setValue("body", props.defaultInputData.body);
        }
    }, [props.defaultInputData, setValue]);

    const submitHandler = (data: CommentFormFields) => {
        if (props.isEdit && !confirm("Are you sure you want to update this comment?")) return;

        const newComment: Comment = {
            body: data.body,
            postId: data.postId,
            user: { id: data.userId }
        };
        props.mutateFn(newComment);
    };

    return (
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700" htmlFor="userId">User ID</label>
                <input
                    type="number"
                    id="userId"
                    className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...register("userId", { required: "User ID is required." })}
                />
                {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700" htmlFor="postId">Post ID</label>
                <input
                    type="number"
                    id="postId"
                    className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...register("postId", { required: "Post ID is required." })}
                />
                {errors.postId && <p className="text-red-500 text-xs mt-1">{errors.postId.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700" htmlFor="body">Comment</label>
                <textarea
                    id="body"
                    className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    {...register("body", { required: "Comment body is required." })}
                />
                {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body.message}</p>}
            </div>

            <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-all ${props.isEdit ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"}`}
            >
                {props.isEdit ? "Update Comment" : "Add Comment"}
            </button>
        </form>
    );
};

export default CommentForm;
