import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

interface DeletedProduct extends ProductDetail {
  isDeleted: Boolean;
  deletedOn: string;
}

export const fetchProductDetail = async (id: string | undefined) => {
  return await axios.get<ProductDetail>(`/product/${id}`);
};

const deleteProduct = async (id: string | undefined) => {
  return await axios.delete<DeletedProduct>(`product/${id}`);
};

const ProductDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image Skeleton */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-lg bg-slate-200 animate-pulse h-64"></div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded animate-pulse w-24"></div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-12"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
        </div>
      </div>

      {/* Reviews Skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-full mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-slate-50 p-4 rounded-lg border border-slate-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse w-12"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const getProductDetail = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => fetchProductDetail(id)
  });
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(id)
  });
  const product: ProductDetail | undefined = getProductDetail.data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteProductMutation.isSuccess) {
      navigate("/product", { replace: true });
    }
  }, [deleteProductMutation.isSuccess, navigate]);

  return (
    <div className="bg-blue-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {getProductDetail.isFetching || product === undefined ? (
          <ProductDetailSkeleton />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {deleteProductMutation.isPending && (
              <div className="fixed inset-0 bg-white/75 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex items-center bg-white rounded-lg shadow-lg px-6 py-3">
                  <span className="text-lg mr-4 text-gray-700">Deleting...</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="flex justify-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full max-w-lg rounded-lg shadow-md"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {product.title}
                </h1>
                <p className="text-gray-700">{product.description}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <>
                      <p className="text-sm text-gray-500 line-through">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600">
                        {product.discountPercentage.toFixed(2)}% off
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-gray-700 text-sm">
                    {product.rating.toFixed(2)}
                  </p>
                </div>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Availability:</span>{" "}
                  {product.availabilityStatus}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">SKU:</span> {product.sku}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Weight:</span> {product.weight} oz
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {product.dimensions.width} x {product.dimensions.height} x{" "}
                  {product.dimensions.depth} mm
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Warranty:</span>{" "}
                  {product.warrantyInformation}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Shipping:</span>{" "}
                  {product.shippingInformation}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Return Policy:</span>{" "}
                  {product.returnPolicy}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Minimum Order:</span>{" "}
                  {product.minimumOrderQuantity}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Reviews
              </h2>
              <div className="space-y-3">
                {product.reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet.</p>
                ) : (
                  product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-gray-700 text-sm">{review.rating}</p>
                      </div>
                      <p className="text-gray-800 text-sm">{review.comment}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        - {review.reviewerName} on{" "}
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative group">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
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
                  if (confirm("Are you sure want to delete this product?")) {
                    deleteProductMutation.mutate();
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

export default ProductDetail;