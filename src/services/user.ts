import api from "./api";

interface UserProps {
    photo: string;
    name: string;
}

const getUserInfo = async () => {
  try {
    
    const response = await api.get(`/users/`);
    const { photo, name }: UserProps = response.data;
    return { photo, name };
  } catch (error) {
    throw error;
  }
}

const editUserInfo = async (data: UserProps) => {
  try {
    const response = await api.patch("/users", data); 
    return response.data;
  } catch (error) {
    console.error('Error editing user info:', error);
    throw error;
  }
}

export { getUserInfo, editUserInfo };