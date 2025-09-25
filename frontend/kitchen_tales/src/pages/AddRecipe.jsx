import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    coverImage: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      };

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/recipe", recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Show toast notification
      toast.success("Recipe Added Successfully!", {
        position: "top-right",
        autoClose: 3000, // 3s then disappears
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 3000);

      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        prepTime: "",
        coverImage: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipe.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">Add a New Recipe</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium">
            Ingredients (comma separated)
          </label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="e.g. sugar, flour, eggs"
            className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none"
            rows="4"
            required
          />
        </div>

        {/* Prep Time */}
        <div>
          <label className="block text-sm font-medium">Prep Time (minutes)</label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="http://example.com/image.jpg"
            className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
