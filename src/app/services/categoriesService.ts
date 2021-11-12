import http from "./httpService";
import { apiUrl } from "../../config.json";
import { Category } from "../models/category";

const apiEndpoint = apiUrl + "category";

export const getAllCategories = async () => {
  const { data: categories } = await http.get<Array<Category>>(apiEndpoint);
  return categories;
};

export const getCategory = async (cateId: number) => {
  const { data: category } = await http.get<Category>(
    apiEndpoint + "/" + cateId
  );
  return category;
};
