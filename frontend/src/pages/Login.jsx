import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { shopContext } from '../context/ShopContext';
import axios from 'axios';
import { backend_API } from '../config';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { navigate, setUserLogin, showCartsData } = useContext(shopContext);

  const switchMode = (mode) => {
    setCurrentState(mode);
    setUsername("");
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (currentState === "Sign up") {
      const data = {
        username: username.trim(),
        email: email.trim(),
        password,
        fullname: fullname.trim(),
      };

      try {
        const response = await axios.post(
          `${backend_API}/api/auth/signup`,
          data
        );
        const res = response.data;
        const token = res.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        setUsername("");
        setEmail("");
        setPassword("");
        setFullName("");
        setUserLogin(true);
        if (showCartsData) showCartsData();
        toast.success(res.message || "Account created successfully!");
        navigate("/");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (currentState === "Login") {
      const data = {
        username: username.trim(),
        password,
      };

      try {
        const response = await axios.post(
          `${backend_API}/api/auth/login`,
          data
        );
        const res = response.data;
        const token = res.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        setUsername("");
        setPassword("");
        setUserLogin(true);
        if (showCartsData) showCartsData();
        toast.success(res.message || "Logged in successfully!");
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-10 transition-all duration-300">
        
        {/* Header Tabs Switcher */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl mb-8 border border-gray-200/60">
          <button
            type="button"
            onClick={() => switchMode("Login")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              currentState === "Login"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("Sign up")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              currentState === "Sign up"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {currentState === "Login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            {currentState === "Login"
              ? "Enter your credentials to access your account"
              : "Fill in your details to start shopping with us"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition duration-200"
                placeholder="e.g. johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Full Name Input (Sign Up only) */}
          {currentState === "Sign up" && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition duration-200"
                  placeholder="e.g. John Doe"
                  required
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Email Input (Sign Up only) */}
          {currentState === "Sign up" && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition duration-200"
                  placeholder="e.g. john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              {currentState === "Login" && (
                <button
                  type="button"
                  onClick={() => toast.info("Please contact support to reset your password.")}
                  className="text-xs text-gray-500 hover:text-black font-medium transition cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-11 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition duration-200"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 px-4 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              currentState === "Login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        {/* Footer switch prompt */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            {currentState === "Login" ? "Don't have an account yet?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(currentState === "Login" ? "Sign up" : "Login")}
              className="text-black font-semibold hover:underline cursor-pointer ml-1"
            >
              {currentState === "Login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;