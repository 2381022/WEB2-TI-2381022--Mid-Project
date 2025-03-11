import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  difficulty: string;
  image: string;
  rating: number;
}

interface RecipesList {
  recipes: Recipe[];
}

const RecipeCard: React.FC<Recipe> = (recipe: Recipe) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        alt={recipe.name}
        src={recipe.image}
        className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-70"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {recipe.name}
        </h3>
        <div className="flex items-center mt-2">
          <svg
            className="w-4 h-4 text-yellow-400 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-sm text-gray-600">{recipe.rating}</p>
        </div>
        <p className="text-sm font-medium text-blue-500 mt-2">
          {recipe.difficulty}
        </p>
      </div>
    </div>
  );
};

const fetchRecipesList = async () => {
  return await axios.get<RecipesList>("/recipes");
};

const RecipesSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="animate-pulse bg-slate-200 h-48 w-full"></div>

      <div className="p-4">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4 mt-2"></div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const getRecipesList = useQuery({
    queryKey: ["recipeList"],
    queryFn: fetchRecipesList
  });
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Add Recipe Button */}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 z-10"
          onClick={() => navigate("./add")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>

        {/* Recipe List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            List of Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getRecipesList.isFetching ? (
              Array.from({ length: 4 }).map((_, index) => (
                <RecipesSkeleton key={index} />
              ))
            ) : (
              getRecipesList.data?.data.recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  <RecipeCard {...recipe} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;