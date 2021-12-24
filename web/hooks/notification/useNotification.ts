import { toast } from "react-toastify";

export const useNotification = (): {
  notificationError: (url: string) => void;
  notificationSuccess: (url: string) => void;
} => {
  const notificationError = (message: string): void => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notificationSuccess = (message: string): void => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return {
    notificationError,
    notificationSuccess,
  };
};
