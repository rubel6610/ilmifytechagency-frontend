 "use client"
 
import Lottie from "lottie-react";
import registerAnimation from "../../../public/assets/lotties/register"; // your lottie json

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* LEFT: FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-6">Register your account</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Photo URL</label>
              <input
                type="text"
                placeholder="Photo URL"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer font-medium">
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full border flex items-center justify-center gap-3 py-2 rounded-md hover:bg-gray-50 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        {/* RIGHT: LOTTIE */}
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <Lottie
            animationData={registerAnimation}
            loop={true}
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
