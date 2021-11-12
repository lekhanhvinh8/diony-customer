import httpService from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "users";

export async function register(user: any) {
  const response = await httpService.post(apiEndpoint, {
    email: user.userName,
    password: user.password,
    name: user.name,
  });

  return response;
}
