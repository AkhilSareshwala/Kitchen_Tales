import React, { useState, useEffect } from "react";
import { HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useLocation, Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-toastify";  // ✅ toast for feedback

const RecipeItems = ({ recipes, onEdit }) => {
  const [localRecipes, setLocalRecipes] = useState(recipes || []);

  // keep local state in sync if parent updates recipes
  useEffect(() => {
    setLocalRecipes(recipes || []);
  }, [recipes]);

  const handleDelete = (id) => {
    setLocalRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  if (!localRecipes || localRecipes.length === 0) {
    return <p className="text-gray-500">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {localRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isMyRecipe = location.pathname === "/myRecipe";

  // ✅ Load favorite state from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(favs.some((r) => r._id === recipe._id));
  }, [recipe._id]);

  // ✅ Toggle favorite
  const toggleLike = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavs;

    if (liked) {
      // remove from favorites
      updatedFavs = favs.filter((r) => r._id !== recipe._id);
      toast.info("Removed from favorites");
    } else {
      // add to favorites
      updatedFavs = [...favs, recipe];
      toast.success("Added to favorites");
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setLiked(!liked);
  };

  const onDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onDelete) {
        onDelete(id);
      }

      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete recipe");
    }
  };

  return (
    <>
      <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-4 flex flex-col justify-between flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-emerald-700">{recipe.title}</h3>
              <p className="text-gray-600 text-sm">{recipe.prepTime} mins</p>
            </div>

            <div className="flex items-center gap-2">
              {/* ❤️ Like / Favorite */}
              <button
                onClick={toggleLike}
                className="p-1 rounded-full hover:bg-gray-100 transition hover:cursor-pointer"
              >
                <HeartIcon
                  className={`w-6 h-6 ${liked ? "text-red-500" : "text-gray-300"}`}
                />
              </button>

              {/* ✏️ Edit / 🗑️ Delete only in /myRecipe */}
              {isMyRecipe && (
                <>
                  <Link to={`/editRecipe/${recipe._id}`}>
                    <button
                      onClick={() => onEdit && onEdit(recipe)}
                      className="p-1 rounded-full hover:bg-gray-100 transition hover:cursor-pointer"
                    >
                      <PencilIcon className="w-6 h-6 text-blue-500" />
                    </button>
                  </Link>

                  <button
                    onClick={() => onDeleteRecipe(recipe._id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition hover:cursor-pointer"
                  >
                    <TrashIcon className="w-6 h-6 text-red-500" />
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition hover:cursor-pointer"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title={recipe.title}>
          <div className="space-y-4">
            <img
              src={recipe.coverImage}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime} mins
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul className="list-disc list-inside">
              {recipe.ingredients?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>Instructions:</strong>
            </p>
            <p className="whitespace-pre-line">{recipe.instructions}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RecipeItems;
