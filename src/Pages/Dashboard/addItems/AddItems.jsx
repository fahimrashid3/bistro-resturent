import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddItems = () => {
  const [disabled, setDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, reset, handleSubmit } = useForm();
  // TODO: cloud name and presets key should be in the .env file
  const cloud_name = import.meta.env.VITE_cloud_name;
  const preset_key = import.meta.env.VITE_preset_key; // Use your preset name here
  // const [image, serImage] = useState("");
  const onSubmit = async (data) => {
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
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.secure_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
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
        heading="Add an Item"
        subHeading="What's new?"
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
            placeholder="Name"
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
                Select a item
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
              placeholder="Price"
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
            placeholder="recipe"
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

export default AddItems;
