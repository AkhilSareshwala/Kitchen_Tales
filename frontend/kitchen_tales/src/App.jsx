import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditRecipe from "./pages/EditRecipe";

// Loader function
export const getAllRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/recipe");
    return response.data; // this will be available in the component
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; // fallback empty array
  }
};

export const getMyRecipes = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return [];

    const allRecipes = await getAllRecipes();

    return allRecipes.filter(recipe => {
      if (!recipe.created_by) return false;
      // Convert both to string
      const createdById = recipe.created_by._id ? String(recipe.created_by._id) : String(recipe.created_by);
      return createdById === String(user._id);
    });
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    return [];
  }
};

// ✅ New: Get Favourite Recipes
export const getFavouriteRecipes = async () => {
  try {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    return favs;  // return local favourites
  } catch (error) {
    console.error("Error fetching favourite recipes:", error);
    return [];
  }
};

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path: "/myRecipe",
        element: <Home />,
        loader: getMyRecipes,
      },
      {
        path: "/favouriteRecipe",
        element: <Home />,
        loader: getFavouriteRecipes, // ✅ Use loader here
      },
      {
        path: "/addRecipe",
        element: <AddRecipe />,
      },
      {
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* ✅ ToastContainer added globally */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
