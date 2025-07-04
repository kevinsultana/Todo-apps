import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { BaseApi } from "../Api/BaseApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingModal from "../components/LoadingModal";

export default function SignUp() {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState([]);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!userName || !password || !confirmPassword) {
      toast.error("Please enter username, password, and confirm password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (dataUser.some((user) => user.userName === userName)) {
      toast.error("Username already exists");
      return;
    }
    setLoading(true);
    try {
      const response = await BaseApi.post("/users", {
        userName,
        password,
      });
      if (response.status === 201) {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Registration successful");
        navigate("/", { replace: true });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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

  const togglePasswordVisibility = (password) => {
    if (password === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-800 transition-all duration-300 justify-center items-center h-screen">
      {loading && <LoadingModal />}
      {/* container */}
      <div className="p-4 bg-white dark:bg-gray-500 shadow-2xl w-sm rounded-xl">
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-white">User Name</label>
            <input
              placeholder="Create your username"
              className="p-2 border rounded-md outline-none text-black dark:text-white"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-white">Password</label>
            <div className="flex p-2 border rounded-md text-black dark:text-white">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create your password"
                className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => togglePasswordVisibility("password")}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-black dark:text-white">
              Confirm Password
            </label>
            <div className="flex p-2 border rounded-md text-black dark:text-white">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={() => togglePasswordVisibility("confirm")}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            onClick={handleRegister}
            className="bg-teal-500 text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-600 active:bg-teal-700"
          >
            Register
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border-2 text-center border-teal-500 text-black dark:text-white p-2 rounded-md w-3xs max-w-3xs self-center shadow-2xl transition-all duration-300 hover:bg-teal-400 active:bg-teal-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
