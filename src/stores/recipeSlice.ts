import { StateCreator } from "zustand";
import {
  getCategory,
  getRecipeById,
  getRecipes,
} from "../services/recipeSlice";
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  seletectdRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipe: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const CreateRecipesSlice: StateCreator<RecipeSliceType & FavoritesSliceType , [] , [] , RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  seletectdRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategory();
    set({
      categories,
    });
  },
  searchRecipe: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks,
    });
  },
  selectRecipe: async (id) => {
    const seletectdRecipe = await getRecipeById(id);
    set({
      seletectdRecipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      seletectdRecipe: {} as Recipe,
      modal: false,
    });
  },
});
