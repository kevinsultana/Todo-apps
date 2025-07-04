import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { BaseApi } from "../Api/BaseApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingModal from "../components/LoadingModal";

export default function Login() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  console.log(dataUser);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const getDataUser = async () => {
    setLoading(true);
    try {
      const response = await BaseApi.get("/users");
      setDataUser(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (!userName || !password) {
      toast.error("Please enter username and password");
      return;
    }

    const user = dataUser.find(
      (user) => user.userName === userName && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful");
      navigate("/", { replace: true });
    } else {
      toast.error("Login failed - Invalid username or password");
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-800 transition-all duration-300 justify-center items-center h-screen">
      {loading && <LoadingModal />}
      {/* container */}
      <div className="p-4 bg-white dark:bg-gray-500 shadow-2xl w-sm rounded-xl transition-all duration-300">
        {/* btn dark mode */}
        <div className="flex w-full justify-end ">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full border border-gray-100 transition-all duration-300 ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>
        {/* logo and title */}
        <div className="flex flex-col gap-4 items-center mb-6">
          <img src={logo} alt="logo" className="w-26 self-center" />
          <h2 className="text-xl font-bold text-black dark:text-white">
            Tasktify
          </h2>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-4 mb-2">
          {/* username */}
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-white">User Name</label>
            <input
              placeholder="Enter your username"
              className="p-2 border rounded-md outline-none text-black dark:text-white"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-black dark:text-white">Password</label>
            <div className="flex p-2 border rounded-md text-black dark:text-white">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* btn action */}
          <button
            onClick={handleLogin}
            className="bg-teal-500 text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-600 active:bg-teal-700"
          >
            Login
          </button>
          <Link
            to={"/sign-up"}
            className="border-2 text-center border-teal-500 text-black dark:text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-400 active:bg-teal-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
