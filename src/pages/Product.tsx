import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string
}

interface ProductData {
  products: Product[]
}

const fetchProductList = async () => {
  return await axios.get<ProductData>("/product")
}

const ProductSkeleton = () => {
  return (
    <div className="group relative">
      {/* Image Placeholder */}
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>

      <div className="mt-4 flex justify-between">
        {/* Title Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          {/* Description Placeholder */}
          <div className="mt-1 h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        {/* Price Placeholder */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </div>
  );
};

const Product = () => {
  const getProductList = useQuery({ queryKey: ["productList"], queryFn: fetchProductList })
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <button
            className="bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => navigate("./add")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {getProductList.isFetching ? (Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))) : (
            getProductList.data?.data.products.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-md shadow-sm overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="aspect-square w-full object-cover group-hover:opacity-75 lg:aspect-auto lg:h-64"
                />
                <div className="p-4">
                  <h3 className="text-sm text-gray-700 font-medium">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-gray-800 font-semibold">{product.price}$</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Product