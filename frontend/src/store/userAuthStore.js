import { create } from "zustand"
import { axiosInstance } from "@/Axios/axios.js";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"
export const useAuthStore = create((set, get) => ({
    authUser: null,
    getTasks: async () => {
        try {
            const res = axiosInstance.get("/api/get-tasks" ,  )
        } catch (error) {
            console.log("Error in check auth :", error);
            set({ authUser: null })
        }
    }
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = axiosInstance.get("/auth/check")
            set({ authUser: (await res).data })
        } catch (error) {
            console.log("Error in check auth :", error);
            set({ authUser: null })
        }
    },
    signup: async (data) => {
        try {
            console.log("1 ", data);
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            console.log("2 ", data);
            toast.success("Account Created Successfully!")
            window.location.href = '/home';
            return authUser
        } catch (error) {
            console.log('Toast Error!');
            toast.error(error.response?.data?.message || "Signup failed!");
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged In!")
            window.location.href = '/home';
            return
        } catch (error) {
            toast.error("Invalid Credentials!")
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            window.location.href = '/login';
        } catch (error) {
            console.log("Logout Error with Axios Instance:", error);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Profile Updated Successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
}));
