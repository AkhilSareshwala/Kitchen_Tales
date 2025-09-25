import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const InputForm = ({ closeModal }) => {
  const [isNewUser, setIsNewUser] = useState(false); // toggle between signup/login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isNewUser ? "signup" : "login";
    try {
      const response = await axios.post(
        `http://localhost:5000/${endpoint}`,
        formData
      );

      // ✅ Save token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User Data:", response.data.user);
        console.log("Token:", response.data.token);
      }

     

      // ✅ Close modal on success
      if (closeModal) closeModal();
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Login/Signup failed! Please try again.";
      toast.error(errMsg, { toastId: "auth-error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white  shadow-lg rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-emerald-700 text-center">
        {isNewUser ? "Create New Account" : "Login"}
      </h2>

      {/* Show name input only if creating account */}
      {isNewUser && (
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required={isNewUser}
          />
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition hover:cursor-pointer"
      >
        {isNewUser ? "Create Account" : "Login"}
      </button>

      {/* Toggle link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        {isNewUser ? "Already have an account?" : "New user?"}{" "}
        <span
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-emerald-600 font-medium cursor-pointer hover:underline"
        >
          {isNewUser ? "Login" : "Create Account"}
        </span>
      </p>
    </form>
  );
};

export default InputForm;
