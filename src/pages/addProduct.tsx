import { useMutation } from "@tanstack/react-query";
import ProductForm, { ProductFormInput } from "../components/ProductForm";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const addProduct = async (data: ProductFormInput) => {
  return await axios.post("/products/add", data);
};

const AddProduct = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addProduct
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/product", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isPending && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white rounded-md shadow-lg px-6 py-3">
            <span className="text-lg mr-3 text-gray-700">Adding...</span>
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h2>
        <ProductForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddProduct;