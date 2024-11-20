import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CreateRecipesSlice, RecipeSliceType } from "./recipeSlice";
import { CreateFavoritesSlice , FavoritesSliceType} from "./favoritesSlice";
import { CreateNotificationSlice , NotificationSliceType} from "./notificationSlice";


export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType>()(
  devtools((...a) => ({
    ...CreateRecipesSlice(...a),
    ...CreateFavoritesSlice(...a),
    ...CreateNotificationSlice(...a),
  }))
);
