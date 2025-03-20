import api from "./api";

interface SignupProps {
    name: string;
    email: string;
    password: string;
    url_img: string;
}


const signup = async (data:SignupProps) => {
  try {
    const response = await api.post("/auth/sign-up", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default signup;