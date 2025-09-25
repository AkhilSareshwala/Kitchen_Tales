import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditRecipe = () => {
  const { id } = useParams(); // recipe id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    prepTime: "",
    coverImage: "",
  });

  // Fetch recipe details on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        const recipe = response.data;

        setFormData({
          title: recipe.title,
          ingredients: recipe.ingredients || [""],
          instructions: recipe.instructions,
          prepTime: recipe.prepTime,
          coverImage: recipe.coverImage,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error("Failed to load recipe");
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredients change
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  // Add new ingredient field
  const addIngredient = () => {
    setFormData((prev) => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/recipe/${id}`, formData);
      toast.success("Recipe updated successfully!");
      navigate("/myRecipe");
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">Edit Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Prep Time */}
        <div>
          <label className="block text-gray-700">Prep Time (mins)</label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-gray-700">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 border px-3 py-2 rounded-md focus:ring focus:ring-emerald-300"
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="5"
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-emerald-300"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
