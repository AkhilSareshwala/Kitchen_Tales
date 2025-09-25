import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Tailwind classes for links
  const baseLinkClass =
    "cursor-pointer px-3 py-2 rounded hover:bg-emerald-600 hover:text-white transition";
  const activeLinkClass = "bg-emerald-600 text-white";

  // 🚀 If not logged in → open modal instead of toast
  const handleProtectedLink = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openModal(); // directly show modal
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
        {/* Site Name */}
        <h2 className="text-xl font-bold text-emerald-700">Kitchen Tales</h2>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myRecipe"
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
                }
                onClick={(e) => handleProtectedLink(e, "/myRecipe")}
              >
                My Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favouriteRecipe"
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
                }
                onClick={(e) => handleProtectedLink(e, "/favouriteRecipe")}
              >
                Favourites
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-red-600 hover:text-white transition hover:cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="px-3 py-2 rounded hover:bg-emerald-600 hover:text-white transition hover:cursor-pointer"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Modal */}
      {isOpen && (
        <Modal closeModal={closeModal} title="Welcome Back!">
          <InputForm
            closeModal={() => {
              closeModal();
              setIsLoggedIn(true);
              toast.success("Login successful!");
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
