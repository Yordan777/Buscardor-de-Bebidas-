import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (paylaod: Pick<Notification, "text" | "error">) => void;
  hiddenNotification: () => void;
};

export const CreateNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (set,get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (paylaod) => {
    set({
      notification: {
        text: paylaod.text,
        error: paylaod.error,
        show: true,
      },
    });
    setTimeout(() => {
        get().hiddenNotification()
    }, 5000);
  },
  hiddenNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
