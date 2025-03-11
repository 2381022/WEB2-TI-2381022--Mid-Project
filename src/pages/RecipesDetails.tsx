import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface RecipeDetails {
  id: number;
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
  userId: number;
  image: string;
  rating: number;
  mealType: string[];
}

interface DeletedRecipe extends RecipeDetails {
  isDeleted: Boolean;
  deletedOn: string;
}

export const fetchRecipeDetail = async (id: string | undefined) => {
  return await axios.get<RecipeDetails>(`/recipes/${id}`);
};

const deleteRecipe = async (id: string | undefined) => {
  return await axios.delete<DeletedRecipe>(`recipes/${id}`);
};

const RecipeDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Image and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg bg-slate-200 animate-pulse h-64 md:h-96"></div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2"></div>
          <div className="h-6 bg-slate-200 rounded animate-pulse w-2/3"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-200 rounded animate-pulse w-3/4"
              ></div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-200 rounded animate-pulse w-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeContent: React.FC<RecipeDetails> = (recipe: RecipeDetails) => {
  return (
    <div className="space-y-6">
      {/* Recipe Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          className="rounded-lg shadow-md"
          src={recipe.image}
          alt={recipe.name}
        />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-gray-800">
            {recipe.name}
          </h1>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-gray-700">{recipe.rating}</p>
          </div>
          <p className="text-gray-700">
            <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Meal Type:</span>{" "}
            {recipe.mealType.join(", ")}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Cook Time:</span>{" "}
            {recipe.cookTimeMinutes} Mnts,{" "}
            <span className="font-semibold">Prep Time:</span>{" "}
            {recipe.prepTimeMinutes} Mnts
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Tags:</span> {recipe.tags.join(", ")}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Servings:</span> {recipe.servings} (
            {recipe.caloriesPerServing * recipe.servings} Cal)
          </p>
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const RecipesDetail = () => {
  const { id } = useParams();

  const getRecipeDetails = useQuery({
    queryKey: ["recipeDetail", id],
    queryFn: () => fetchRecipeDetail(id)
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id)
  });

  const recipe: RecipeDetails | undefined = getRecipeDetails.data?.data;

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRecipeMutation.isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [deleteRecipeMutation.isSuccess, navigate]);

  return (
    <div className="bg-blue-50 min-h-screen py-6 px-4">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
        {getRecipeDetails.isFetching || recipe === undefined ? (
          <RecipeDetailSkeleton />
        ) : (
          <RecipeContent {...recipe} />
        )}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative group">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm14 12H4a1 1 0 01-1-1V5a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute bottom-14 right-0 bg-white rounded-md shadow-lg w-32 hidden group-focus-within:block">
              <button
                onClick={() => {
                  navigate("edit");
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                onClick={() => {
                  if (confirm("Are you sure want to delete this recipe?")) {
                    deleteRecipeMutation.mutate();
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesDetail;