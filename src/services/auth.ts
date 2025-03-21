import api from "./api";

interface SignupProps {
    name: string;
    email: string;
    password: string;
    url_img: string;
}

interface LoginProps {
    email: string;
    password: string;
}


const signup = async (data:SignupProps) => {
  try {
    const response = await api.post("/auth/sign-up", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const login = async (data:LoginProps) => {
  try {
    const response = await api.post("/auth", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { signup, login };