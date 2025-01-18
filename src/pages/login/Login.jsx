import loginBg from "../../assets/login.jpg";
import animationData from "../../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Lottie from "lottie-react";
import Button from "../../components/Button";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn, githubSignIn, setEmail, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogin = () => {
    googleSignIn().then(async (res) => {
      console.log(res);
      const userData = {
        name: res?.user?.displayName || "Anonymous User",
        email: res?.user?.email,
        photo: res?.user?.photoURL || "",
        role: "user",
        timeStamp: Date.now(),
      };

      // Save user to the database
      await axiosPublic.post("/users", userData);

      // Navigate to the intended page or home
      navigate(location.state?.from || "/");
      toast.success("Login Successful!");
    });
  };

  const handleGithubLogin = () => {
    githubSignIn()
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Login Successfull!");
      })
      .catch(() => {});
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        setError("");
        setEmail(email);
        toast.success("Login Successfull!");
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        setError("Invalid Username or Password..!");
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen mx-auto flex flex-col lg:flex-row items-center justify-center bg-[#472d9c] bg-no-repeat px-4 sm:px-8"
    >
      <Helmet>
        <title>Login | Elite Explore</title>
      </Helmet>
      {/* Left Section */}
      <div className="lg:w-1/2 mx-auto">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Right Section */}
      <div className="w-full mx-auto backdrop-blur-2xl shadow-lg rounded-xl p-6 sm:p-8 sm:max-w-md text-secondary">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Welcome to Elite Explore!
        </h2>

        <form onSubmit={handleLogin} className="mt-6 w-full">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full bg-transparent px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 bg-transparent rounded"
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <Button text="Sign In" />
          <p className="my-2 text-red-600 text-center">{error}</p>
        </form>
        <div className="divider">or</div>
        <div className="flex justify-center items-center gap-3">
          <button type="submit" onClick={handleGoogleLogin}>
            <img
              className="w-10 h-10 hover:scale-105"
              src="https://i.ibb.co.com/dK5ntqv/icons8-google-48.png"
            />
          </button>
          <button type="submit" onClick={handleGithubLogin}>
            <img
              className="w-14 h-14 hover:scale-105"
              src="https://i.ibb.co.com/CWkQgF5/icons8-github-48.png"
            />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-md text-center">
          Don’t have an account?
          <Link
            to="/register"
            className="text-primary font-medium hover:underline ml-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
