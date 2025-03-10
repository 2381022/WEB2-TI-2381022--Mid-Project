import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, ProductFormInput, unknown>;
  defaultInputData?: ProductFormInput;
}

export type ProductFormInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
};

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductFormInput>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("title", props.defaultInputData.title);
      setValue("description", props.defaultInputData.description);
      setValue("discountPercentage", props.defaultInputData.discountPercentage);
      setValue("category", props.defaultInputData.category);
      setValue("price", props.defaultInputData.price);
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
    if (props.isEdit && !confirm("Are you sure you want to update product data?")) {
      return;
    }
    props.mutateFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          placeholder="Product Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          rows={4}
          placeholder="Product Description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
          placeholder="0.00"
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Category</label>
        <select
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
          {...register("category", { required: "Category is required" })}
        >
          <option value="beauty">Beauty</option>
          <option value="fragrance">Fragrance</option>
          <option value="furniture">Furniture</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Discount Percentage (%)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.discountPercentage ? "border-red-500" : "border-gray-300"}`}
          placeholder="0"
          {...register("discountPercentage", { required: "Discount is required" })}
        />
        {errors.discountPercentage && <p className="text-red-500 text-sm mt-1">{errors.discountPercentage.message}</p>}
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md ${
          props.isEdit ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {props.isEdit ? "Save Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
