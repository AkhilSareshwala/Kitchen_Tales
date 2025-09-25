import React, { useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import RecipeItems from "../../components/RecipeItems";
import foodRecipe from "../assets/foodRecipe.png";
import Modal from "../../components/Modal";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";

export default function Home() {
  const recipes = useLoaderData(); // array of recipes
  const navigate = useNavigate();
  const location = useLocation(); // to check current route

  const [showModal, setShowModal] = useState(false);

  const handleAddRecipe = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(true); // show login/signup modal
    } else {
      navigate("/addRecipe");
    }
  };

  // Dynamic heading based on path
  const getHeading = () => {
    if (location.pathname === "/myRecipe") return "Your Recipes";
    if (location.pathname === "/favouriteRecipe") return "Your Favourite Recipes";
    return "Explore Our Latest Recipes"; // default for home
  };

  return (
    <>
      {/* Hero Section - only show on home page */}
      {location.pathname === "/" && (
        <section className="relative bg-gradient-to-r from-emerald-50 to-green-100 overflow-hidden min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col-reverse md:flex-row items-center justify-between w-full">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
                Cook, Share & Discover <br />
                <span className="text-emerald-600">Delicious Recipes</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
                A vibrant space where food lovers can explore, share, and enjoy
                recipes from around the world. Bring your kitchen stories to life!
              </p>
              <button
                className="px-6 py-3 bg-emerald-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-emerald-700 hover:cursor-pointer transition"
                onClick={handleAddRecipe}
              >
                Add Your Recipe
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center mb-10 md:mb-0">
              <img
                src={foodRecipe}
                alt="Food Recipe"
                className="w-72 md:w-96 lg:w-[420px] h-auto drop-shadow-2xl rounded-xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Recipes Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8 text-center md:text-left">
          {getHeading()}
        </h2>

        <RecipeItems recipes={recipes} />
      </section>

      {/* Reuse Navbar modal */}
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Welcome Back!">
          <InputForm
            closeModal={() => {
              setShowModal(false);
              toast.success("Login successful!");
            }}
          />
        </Modal>
      )}
    </>
  );
}
