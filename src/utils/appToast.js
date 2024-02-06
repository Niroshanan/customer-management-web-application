import { toast } from "react-toastify";

export const appToast = (type, message) =>
  toast(message, {
    autoClose: true,
    type: type,
  });