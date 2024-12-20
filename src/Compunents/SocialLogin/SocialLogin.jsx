import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(token);
        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div className="flex justify-center items-center gap-5 font-bold">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline rounded-full"
      >
        <FaGoogle />
      </button>
      <button className="btn btn-outline rounded-full btn-disabled">
        <FaFacebookF />
      </button>
      <button className="btn btn-outline rounded-full disabled btn-disabled">
        <PiGithubLogoFill />
      </button>
    </div>
  );
};

export default SocialLogin;
