import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ✅ Local Django backend URL
});

// Automatically attach JWT token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- AUTH ---
export const registerUser = (userData) => API.post("/register/", userData);
export const loginUser = (userData) => API.post("/login/", userData); // if using SimpleJWT TokenObtainPairView

// --- CREATORS ---
export const getCreators = () => API.get("/creators/");

// --- PAYMENTS ---
export const getPayments = () => API.get("/payments/");
export const createPayment = (paymentData) => API.post("/payments/", paymentData);

// --- AI FEATURES ---
export const getAIPaymentPlan = (topic) => API.post("/ai-payment-plan/", { topic });
export const getAITip = (creator_id, engagement_data) =>
  API.post("/creator-payment/", { creator_id, engagement_data });

export default API;
