import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { CreateRecipesSlice, RecipeSliceType } from "./recipeSlice";
import { CreateNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorites: (recipe: Recipe) => void;
  favoriteExists: (id : Recipe['idDrink']) => boolean
  loadFromStorage: () => void
};

export const CreateFavoritesSlice: StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (
  set,
  get,
  api
) => ({
  favorites: [],
  handleClickFavorites: (recipe) => {
    if (
      get().favorites.some((favorite) => favorite.idDrink === recipe.idDrink)
    ) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      CreateNotificationSlice(set,get,api).showNotification({
        text : 'Se Elimino de Favoritos',
        error : true
      })
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      CreateNotificationSlice(set,get,api).showNotification({
        text : 'Se Agrego de Favoritos',
        error : false
      })
    }

    CreateRecipesSlice(set,get,api).closeModal()
    localStorage.setItem('favorites' , JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id)
  },
  loadFromStorage : () => {
    const storedFavorite = localStorage.getItem('favorites')

    if (storedFavorite) {
      set({
        favorites : JSON.parse(storedFavorite)
      })
    }
  }
  
});
