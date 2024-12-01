import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";

const UpdateItem = () => {
  const oldMenu = useLoaderData();
  const [disabled, setDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, reset, handleSubmit } = useForm();

  // Cloudinary configuration
  const cloud_name = "dipwayvsu";
  const preset_key = "bistro";

  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data); // Debugging data
      setDisabled(true);

      const { image } = data;
      const file = image && image[0];
      let uploadedImageUrl = oldMenu.image;

      // Check if a new image is provided
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);

        // Upload to Cloudinary
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        uploadedImageUrl = res.data.secure_url;
      }

      const updatedMenuItem = {
        name: data.name || oldMenu.name,
        recipe: data.recipe || oldMenu.recipe,
        image: uploadedImageUrl,
        category: data.category || oldMenu.category,
        price: parseFloat(data.price) || oldMenu.price,
      };

      console.log("Updated Menu Item:", updatedMenuItem);

      // Update the menu item in the backend
      const menuRes = await axiosSecure.patch(
        `/menu/${oldMenu._id}`,
        updatedMenuItem
      );

      console.log("Backend Response:", menuRes.data);

      if (menuRes.data.modifiedCount) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Menu item updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "No changes detected",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error Updating Item:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="What's New?"
      ></SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-slate-100 rounded-lg"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            defaultValue={oldMenu.name} // Use defaultValue
            {...register("name")}
            className="input input-bordered"
          />
        </div>

        <div className="md:flex w-full gap-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              defaultValue={oldMenu.category}
              {...register("category")}
              className="select select-bordered w-full"
            >
              <option value="dessert">Dessert</option>
              <option value="pizza">Pizza</option>
              <option value="salad">Salad</option>
              <option value="soups">Soups</option>
              <option value="offered">Offered</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              defaultValue={oldMenu.price} // Use defaultValue
              {...register("price")}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe</span>
          </label>
          <textarea
            defaultValue={oldMenu.recipe} // Use defaultValue
            {...register("recipe")}
            className="input input-bordered lg:min-h-52 md:min-h-40 min-h-32"
          />
        </div>

        <div className="form-control">
          <input type="file" {...register("image")} />
        </div>

        <div className="form-control mt-6">
          <button
            disabled={disabled}
            type="submit"
            className="btn btn-warning btn-outline border-1 border-b-8"
          >
            <FaUtensils />
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
