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
  // TODO: cloud name and presets key should be in the .env file
  const cloud_name = "dipwayvsu";
  const preset_key = "bistro"; // Use your preset name here
  const onSubmit = async (data) => {
    console.log(data);
    setDisabled(true);
    const { image } = data;
    // img upload to to cloudinary.com
    const file = image[0]; // Get the image file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    if (res) {
      const updatedMenuItem = {
        name: data.name || oldMenu.name,
        recipe: data.recipe || oldMenu.recipe,
        image: res.data.secure_url || oldMenu.image,
        category: data.category || oldMenu.category,
        price: parseFloat(data.price) || oldMenu.price,
      };
      console.log(updatedMenuItem);
      const menuRes = await axiosSecure.patch(
        `/menu/${oldMenu._id}`,
        updatedMenuItem
      );
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount) {
        reset();
        setDisabled(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New item added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="whats New ?"
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
            placeholder={oldMenu.name}
            {...register("name", { required: true })}
            className="input input-bordered"
          />
        </div>

        <div className="md:flex w-full gap-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full "
            >
              <option disabled value="default">
                Previous category was : {oldMenu.category}
              </option>
              <option value="dessert">dessert</option>
              <option value="pizza">pizza</option>
              <option value="salad">salad</option>
              <option value="soups">soups</option>
              <option value="offered">offered</option>
              <option value="drinks">drinks</option>
            </select>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              placeholder={oldMenu.price}
              {...register("price", { required: true })}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">recipe</span>
          </label>
          <textarea
            type="text"
            placeholder={oldMenu.recipe}
            {...register("recipe", { required: true })}
            className="input input-bordered lg:min-h-52 md:min-h-40 min-h-32"
          />
        </div>
        <div className="form-control">
          <input type="file" {...register("image", { required: true })} />
        </div>

        <div className="form-control mt-6">
          <button
            disabled={disabled}
            type="submit"
            className="btn btn-warning btn-outline border-1 border-b-8"
          >
            <FaUtensils></FaUtensils>
            Add item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
