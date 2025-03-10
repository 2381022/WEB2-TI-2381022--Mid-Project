import { Textarea } from "@headlessui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecipeFormElementProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, Recipe, unknown>;
  defaultInputData?: Recipe;
}

export type RecipeFormFields = {
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string;
  rating: number;
  mealType: string;
};

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  rating: number;
  mealType: string[];
};

const ArrStringToTextLine = (arrString: string[]) => {
  let formattedString: string = "";
  for (let i = 0; i < arrString.length; i++) {
    formattedString += arrString[i];
    if (i < arrString.length - 1) {
      formattedString += "\n";
    }
  }
  return formattedString;
};

const TextLineToArrString = (TextLine: string) => {
  const arrStrings: string[] = [];
  let temp: string = "";
  for (let i = 0; i < TextLine.length; i++) {
    if (TextLine[i] === "\n" || i == TextLine.length - 1) {
      if (i == TextLine.length - 1) temp += TextLine[i];
      arrStrings.push(temp);
      temp = "";
    } else {
      temp += TextLine[i];
    }
  }
  return arrStrings;
};

const reformatTextFieldToObject = (formData: RecipeFormFields) => {
  const reformatedDat: Recipe = {
    name: formData.name,
    ingredients: TextLineToArrString(formData.ingredients),
    instructions: TextLineToArrString(formData.instructions),
    prepTimeMinutes: formData.prepTimeMinutes,
    cookTimeMinutes: formData.cookTimeMinutes,
    servings: formData.servings,
    difficulty: formData.difficulty,
    cuisine: formData.cuisine,
    caloriesPerServing: formData.caloriesPerServing,
    tags: TextLineToArrString(formData.tags),
    rating: formData.rating,
    mealType: TextLineToArrString(formData.mealType),
  };

  return reformatedDat;
};

const RecipeForm: React.FC<RecipeFormElementProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeFormFields>();
  useEffect(() => {
    if (props.defaultInputData) {
      setValue("name", props.defaultInputData.name);
      setValue("ingredients", ArrStringToTextLine(props.defaultInputData.ingredients));
      setValue("instructions", ArrStringToTextLine(props.defaultInputData.instructions));
      setValue("prepTimeMinutes", props.defaultInputData.prepTimeMinutes);
      setValue("cookTimeMinutes", props.defaultInputData.cookTimeMinutes);
      setValue("servings", props.defaultInputData.servings);
      setValue("difficulty", props.defaultInputData.difficulty);
      setValue("cuisine", props.defaultInputData.cuisine);
      setValue("caloriesPerServing", props.defaultInputData.caloriesPerServing);
      setValue("tags", ArrStringToTextLine(props.defaultInputData.tags));
      setValue("rating", props.defaultInputData.rating);
      setValue("mealType", ArrStringToTextLine(props.defaultInputData.mealType));
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure want to update recipe data ? ")) {
        return;
      }
    }

    const reformatedDat = reformatTextFieldToObject(data);
    console.log(reformatedDat);
    props.mutateFn(reformatedDat);
  };

  return (
    <form className="flex flex-col space-y-4 mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
          type="text"
          id="name"
          {...register("name", { required: "Name is required." })}
        />
        {errors.name && <p className="text-red-400 italic text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="difficulty">
          Difficulty
        </label>
        <input
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
          type="text"
          id="difficulty"
          {...register("difficulty", { required: "Difficulty is required." })}
        />
        {errors.difficulty && <p className="text-red-400 italic text-xs">{errors.difficulty.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="prepTimeMinutes">
          Preparation Time (Mnt)
        </label>
        <input
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
          type="number"
          id="prepTimeMinutes"
          {...register("prepTimeMinutes", { required: "Preparation time is required." })}
        />
        {errors.prepTimeMinutes && (
          <p className="text-red-400 italic text-xs">{errors.prepTimeMinutes.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="cookTimeMinutes">
          Cooking Time (Mnt)
        </label>
        <input
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
          type="number"
          id="cookTimeMinutes"
          {...register("cookTimeMinutes", { required: "Cooking Time is required." })}
        />
        {errors.cookTimeMinutes && (
          <p className="text-red-400 italic text-xs">{errors.cookTimeMinutes.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="servings">
            Servings
          </label>
          <input
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
            type="number"
            id="servings"
            {...register("servings", { required: "Servings amount is required." })}
          />
          {errors.servings && <p className="text-red-400 italic text-xs">{errors.servings.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="cuisine">
            Cuisine
          </label>
          <input
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
            type="text"
            id="cuisine"
            {...register("cuisine", { required: "Cuisine is required." })}
          />
          {errors.cuisine && <p className="text-red-400 italic text-xs">{errors.cuisine.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="caloriesPerServing">
            Calories/Serving
          </label>
          <input
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
            type="number"
            id="caloriesPerServing"
            {...register("caloriesPerServing", { required: "Cal/serving amount is required." })}
          />
          {errors.caloriesPerServing && (
            <p className="text-red-400 italic text-xs">{errors.caloriesPerServing.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="rating">
            Rating
          </label>
          <input
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3"
            type="number"
            id="rating"
            step={0.1}
            {...register("rating", { required: "Rating is required." })}
          />
          {errors.rating && <p className="text-red-400 italic text-xs">{errors.rating.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="ingredients">
          Ingredients
        </label>
        <Textarea
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3 h-32 resize-none"
          id="ingredients"
          {...register("ingredients", { required: "Ingredients is required." })}
        />
        {errors.ingredients && <p className="text-red-400 italic text-xs">{errors.ingredients.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300" htmlFor="instructions">
          Instructions
        </label>
        <Textarea
          className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3 h-48 resize-none"
          id="instructions"
          {...register("instructions", { required: "Instructions is required." })}
        />
        {errors.instructions && <p className="text-red-400 italic text-xs">{errors.instructions.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="mealType">
            Meal Type
          </label>
          <Textarea
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3 h-24 resize-none"
            id="mealType"
            {...register("mealType", { required: "Meal type is required." })}
          />
          {errors.mealType && <p className="text-red-400 italic text-xs">{errors.mealType.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300" htmlFor="tags">
            Tags
          </label>
          <Textarea
            className="rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-gray-500 py-2 px-3 h-24 resize-none"
            id="tags"
            {...register("tags", { required: "Tags is required." })}
          />
          {errors.tags && <p className="text-red-400 italic text-xs">{errors.tags.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {props.isEdit ? "Save Recipe" : "Add Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;