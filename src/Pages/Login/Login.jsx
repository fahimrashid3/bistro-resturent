import loginImg from "../../assets/others/authentication2.png";
import loginBg from "../../assets/others/authentication.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";

// for captcha
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((userCredential) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handelValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div
      className="hero  min-h-screen "
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Bistro | Login</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row lg:gap-48 md:gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="" />
        </div>
        <div className="card flex-1 shrink-0">
          <form onSubmit={handelLogin} className="card-body">
            <div className=" font-bold text-center lg:text-5xl md:text-4xl text-3xl md:mb-10 mb-5 text-dark-900 dark:text-white">
              Sign In
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control space-y-2">
              <LoadCanvasTemplate />
              <input
                onBlur={handelValidateCaptcha}
                type="text"
                placeholder="type the above characters "
                name="captcha"
                className="input input-bordered"
              />
              {/* <button
                type="reset"
                className="btn btn-outline btn-sm btn-warning mt-3"
              >
                validate
              </button> */}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={disabled}
                className="btn btn-warning btn-outline border-1 border-b-8"
              >
                Login
              </button>
            </div>
          </form>
          <div className="space-y-5">
            <p className="text-[#D1A054] text-lg text-center">
              New here ?{" "}
              <span className="font-semibold">
                <Link to="/registration">Create a New Account</Link>
              </span>
            </p>
            <p className="text-center text-lg">Or sign in with</p>
            <div className=" flex justify-center items-center gap-5 font-bold">
              <button className="btn btn-outline rounded-full">
                <FaGoogle />
              </button>
              <button className="btn btn-outline rounded-full">
                <FaFacebookF />
              </button>
              <button className="btn btn-outline rounded-full">
                <PiGithubLogoFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
