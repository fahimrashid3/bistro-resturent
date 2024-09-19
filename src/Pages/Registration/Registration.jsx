import loginImg from "../../assets/others/authentication2.png";
import loginBg from "../../assets/others/authentication.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Compunents/SocialLogin/SocialLogin";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword, photoUrl } = data;
    if (password === confirmPassword) {
      // create User using firebase from authProvider
      createUser(email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Profile updated!

          updateUserProfile(name, photoUrl)
            .then(() => {
              const userInfo = {
                name: name,
                email: user.email,
                photoUrl: photoUrl,
              };
              // create user entry in database

              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  navigate("/");

                  // ...
                  reset;
                  // ...
                }
              });
            })
            .catch((error) => {
              // An error occurred
              console.error(error);
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${(errorCode, errorMessage)}`,
            showConfirmButton: false,
            timer: 1500,
          });

          // ..
        });
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Bistro | Registration</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row-reverse lg:gap-48 md:gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="card flex-1 shrink-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="font-bold text-center lg:text-5xl md:text-4xl text-3xl md:mb-10 mb-5 text-dark-900 dark:text-white">
              Sign Up
            </div>
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
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                placeholder="photoUrl"
                {...register("PhotoUrl", { required: true })}
                className="input input-bordered"
              />
              {errors.photoUrl && <span>Photo Url is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              {/* {errors.password && <span>Password required</span>} */}
              {errors.password?.type === "minLength" && (
                <span>Password must be 6 to 16 characters required</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span>Password must be 6 to 16 characters required</span>
              )}
              {errors.password?.type === "pattern" && (
                <span>
                  Password must have one uppercase one lowercase one number and
                  one special characters
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              {errors.confirmPassword?.type === "minLength" && (
                <span>Password must be 6 to 16 characters required</span>
              )}
              {errors.confirmPassword?.type === "maxLength" && (
                <span>Password must be 6 to 16 characters required</span>
              )}
              {errors.confirmPassword?.type === "pattern" && (
                <span>
                  Password must have one uppercase one lowercase one number and
                  one special characters
                </span>
              )}
              {/* {errors.confirmPassword && <span>Password required</span>} */}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-warning btn-outline border-1 border-b-8"
              >
                Register Now
              </button>
            </div>
          </form>
          <div className="space-y-5">
            <p className="text-[#D1A054] text-lg text-center">
              Already registered?{" "}
              <span className="font-semibold">
                <Link to="/login">Go to log in</Link>
              </span>
            </p>
            <p className="text-center text-lg">Or sign in with</p>
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
