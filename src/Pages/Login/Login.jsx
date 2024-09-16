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
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };

  const handelValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
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
      <div className="hero-content flex-col md:flex-row lg:gap-48 md:gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="" />
        </div>
        <div className="card flex-1 shrink-0">
          <form onSubmit={handelLogin} className="card-body">
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
            <div className="form-control">
              <LoadCanvasTemplate />
              <input
                type="text"
                placeholder="type the above characters "
                name="captcha"
                ref={captchaRef}
                className="input input-bordered"
              />
              <button
                onClick={handelValidateCaptcha}
                type="reset"
                className="btn btn-outline btn-sm btn-warning mt-3"
              >
                validate
              </button>
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
