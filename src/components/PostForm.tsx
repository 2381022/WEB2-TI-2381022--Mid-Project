import { Textarea } from '@headlessui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface postFormFields {
  title: string;
  body: string;
  tags: string;
  reactions: reactionType;
  views: number;
  userId: number;
}

interface postDat {
  title: string;
  body: string;
  tags: string[];
  reactions: reactionType;
  views: number;
  userId: number;
}

interface reactionType {
  likes: number;
  dislikes: number;
}

interface PostFormElementProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, postDat, unknown>;
  defaultInputData?: postDat;
}

const ArrStringToTextLine = (arrString: string[]) => arrString.join('\n');
const TextLineToArrString = (TextLine: string) => TextLine.split('\n');

const reformatPostFormFields = (postFieldsData: postFormFields): postDat => ({
  title: postFieldsData.title,
  body: postFieldsData.body,
  tags: TextLineToArrString(postFieldsData.tags),
  reactions: postFieldsData.reactions,
  views: postFieldsData.views,
  userId: postFieldsData.userId,
});

const PostForm: React.FC<PostFormElementProps> = ({ isEdit, mutateFn, defaultInputData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<postFormFields>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("title", defaultInputData.title);
      setValue("body", defaultInputData.body);
      setValue("tags", ArrStringToTextLine(defaultInputData.tags));
      setValue("userId", defaultInputData.userId);
    }
  }, [defaultInputData, setValue]);

  const submitHandler = (data: postFormFields) => {
    if (isEdit && !confirm("Are you sure you want to update the post?")) return;

    data.reactions = defaultInputData?.reactions || { likes: 0, dislikes: 0 };
    data.views = defaultInputData?.views || 1;

    mutateFn(reformatPostFormFields(data));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">{isEdit ? "Edit Post" : "Create Post"}</h2>
      <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
        {[
          { id: "userId", label: "User ID", type: "number" },
          { id: "title", label: "Post Title", type: "text" },
        ].map(({ id, label, type }) => (
          <div key={id} className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold text-gray-700">{label}</label>
            <input id={id} type={type} {...register(id as keyof postFormFields, { required: `${label} is required.` })} className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500" />
            {errors[id as keyof postFormFields] && <p className="text-red-500 text-sm">{errors[id as keyof postFormFields]?.message}</p>}
          </div>
        ))}
        {[
          { id: "body", label: "Post Body" },
          { id: "tags", label: "Post Tags" },
        ].map(({ id, label }) => (
          <div key={id} className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold text-gray-700">{label}</label>
            <Textarea id={id} {...register(id as keyof postFormFields, { required: `${label} is required.` })} className="border rounded-md p-2 h-32 focus:ring-2 focus:ring-indigo-500" />
            {errors[id as keyof postFormFields] && <p className="text-red-500 text-sm">{errors[id as keyof postFormFields]?.message}</p>}
          </div>
        ))}
        <button type="submit" className={`w-full py-2 px-4 rounded-lg font-bold text-white transition ${isEdit ? "bg-blue-500 hover:bg-blue-700" : "bg-green-500 hover:bg-green-700"}`}>{isEdit ? "Save Post" : "Add Post"}</button>
      </form>
    </div>
  );
};

export default PostForm;