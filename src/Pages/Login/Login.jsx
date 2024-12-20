import loginImg from "../../assets/others/authentication2.png";
import loginBg from "../../assets/others/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import SocialLogin from "../../Compunents/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  // show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // console.log(from);

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
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        console.log("Error Code:", error.code);
        console.log("Error Message:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
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
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered bg-white text-dark-900 w-full"
                  name="password"
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute right-12 text-xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
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
                placeholder="type the above characters & click out side"
                name="captcha"
                className="input input-bordered"
              />
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
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
