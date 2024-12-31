import { VITE_API_URL } from "@/config/envs";
import { ResponseRole } from "@/types/role";
import axios from "axios";

const getRoles = async () => {
  return await axios.get<ResponseRole>(`${VITE_API_URL}/role`);
};

export { getRoles };
