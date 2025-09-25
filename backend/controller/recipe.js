import Recipes from '../models/recipe.js';

export const getRecipe = async(req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const getRecipes = async(req, res) => {
    try {
        const recipes = await Recipes.find();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, prepTime, coverImage } = req.body;

  if (!title || !ingredients || !instructions || !prepTime || !coverImage) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      prepTime,
      coverImage,
      created_by: req.user._id, // ✅ linked to logged-in user
    });

    const populatedRecipe = await Recipes.findById(newRecipe._id)
      .populate("created_by", "name email");

    console.log("✅ New Recipe Created:", populatedRecipe);

    return res.status(201).json(populatedRecipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editRecipe = async(req, res) => {
    const { title, ingredients, instructions, prepTime, coverImage } = req.body;
    try {
        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            { title, ingredients, instructions, prepTime, coverImage },
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.status(200).json(updatedRecipe);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   

  
};

export const deleteRecipe = async(req, res) => {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id);   
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        console.log("✅ Recipe Deleted:", deletedRecipe);
        return res.status(200).json({ message: 'Recipe deleted successfully' });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};
