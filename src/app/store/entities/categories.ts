import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, rootCategoryId } from "./../../models/category";
import { getAllCategories } from "../../services/categoriesService";
import { AppThunk, RootState } from "../store";

const initialCategories: Array<Category> = [];

const slice = createSlice({
  name: "categories",
  initialState: initialCategories,
  reducers: {
    categoriesLoadded: (categories, action: PayloadAction<Array<Category>>) => {
      return action.payload;
    },
  },
});

export default slice.reducer;

const { categoriesLoadded } = slice.actions;

export const loadCategories = (): AppThunk => async (dispatch) => {
  const categories = await getAllCategories();
  dispatch(categoriesLoadded(categories));
};

//selectors

export const hasChildren = (cateId: number) =>
  createSelector(
    (state: RootState) => state.entities.categories,
    (categories) => {
      if (cateId === rootCategoryId) return false;

      const children = getChildrenOfRootCategories(cateId, categories);
      if (children === null) return false;

      if (children.length === 0) return false;

      return true;
    }
  );

export const getAllLeaf = createSelector(
  (state: RootState) => state.entities.categories,
  (categories) => {
    let leafs: Array<Category> = [];

    for (const category of categories) {
      leafs = [...leafs, ...getLeafs(category)];
    }

    return leafs;
  }
);

export const getPath = (cateId: number) =>
  createSelector(
    (state: RootState) => state.entities.categories,
    (categories) => {
      if (cateId === null) return null;
      for (const category of categories) {
        const path = getPathOfCate(cateId, category);
        if (path) return path;
      }

      return null;
    }
  );

export const getChildrenOfCateId = (cateId: number) =>
  createSelector(
    (state: RootState) => state.entities.categories,
    (categories) => {
      return getChildrenOfRootCategories(cateId, categories);
    }
  );

//helper

export const getChildrenOfRootCategories = (
  cateId: number,
  rootCategories: Array<Category>
) => {
  for (const category of rootCategories) {
    const children = getChildren(cateId, category);
    if (children) {
      return children;
    }
  }

  return null;
};

export const getChildren = (
  cateId: number,
  rootCategory: Category
): Array<Category> | null => {
  if (rootCategory.id === cateId) return rootCategory.children;

  for (let i = 0; i < rootCategory.children.length; i++) {
    const child = rootCategory.children[i];
    const result = getChildren(cateId, child);
    if (result !== null) return result;
  }

  return null;
};

export const getCategoryFather = (
  cateId: number,
  rootCategory: Category
): Category | null => {
  if (rootCategory.children.map((c) => c.id).includes(cateId))
    return rootCategory;

  for (let i = 0; i < rootCategory.children.length; i++) {
    const child = rootCategory.children[i];
    const result = getCategoryFather(cateId, child);
    if (result !== null) return result;
  }

  return null;
};

const getLeafs = (category: Category): Array<Category> => {
  if (category.children.length === 0) return [category];

  let leafs: Array<Category> = [];
  for (const child of category.children) {
    leafs = [...leafs, ...getLeafs(child)];
  }

  return leafs;
};

const getPathOfCate = (
  cateId: number,
  rootCategory: Category
): Array<Category> | null => {
  if (cateId === rootCategory.id) {
    return [rootCategory];
  }

  for (const child of rootCategory.children) {
    const path = getPathOfCate(cateId, child);
    if (path) return [rootCategory, ...path];
  }

  return null;
};
