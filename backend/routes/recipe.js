import express from 'express';
import {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} from '../controller/recipe.js';
import  verify_token  from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', verify_token,addRecipe);
router.put('/:id', editRecipe);
router.delete('/:id', verify_token,deleteRecipe);

export default router;
