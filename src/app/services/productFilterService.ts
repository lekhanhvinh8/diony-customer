import { apiUrl } from "../../config.json";
import { ProductCard } from "../models/productCard";
import http from "./httpService";
import { numberOfProductsPerFilterPage } from "../../config.json";

const apiEndpoint = apiUrl + "productFilter/";

export interface filterRequestParams {
  pageNumber: number;
  pageSize: number;
  categoryId: number | null;
  searchKey: string | null;
  filteredCategoryId: number | null;
  provinceId: number | null;
  fromPrice: number | null;
  toPrice: number | null;
  ratedStars: number;
}

export const getEmptyFilterRequestParams = () => {
  const requestParams: filterRequestParams = {
    pageNumber: 0,
    pageSize: numberOfProductsPerFilterPage,
    categoryId: null,
    searchKey: null,
    filteredCategoryId: null,
    provinceId: null,
    fromPrice: null,
    toPrice: null,
    ratedStars: 1,
  };

  return requestParams;
};

export const filter = async (params: filterRequestParams) => {
  const { data } = await http.get(apiEndpoint, {
    params: params,
  });

  const products: Array<ProductCard> = data.products.map((element: any) => {
    const product: ProductCard = {
      id: element.id,
      name: element.name,
      avatarUrl: element.coverImage,
      starRate: element.starRate,
      quantitySold: element.quantitySold,
      price: element.price,
      shopAddressProvince: element.province,
    };

    return product;
  });

  const totalProducts: number = data.totalProducts;

  return { products, totalProducts };
};

export const getRelatedProducts = async (
  productId: number,
  numberOfProducts: number
) => {
  const { data } = await http.get(apiEndpoint + "RelatedProducts", {
    params: {
      productId,
      numberOfProducts,
    },
  });

  const products: Array<ProductCard> = data.map((element: any) => {
    const product: ProductCard = {
      id: element.id,
      name: element.name,
      avatarUrl: element.coverImage,
      starRate: element.starRate,
      quantitySold: element.quantitySold,
      price: element.price,
      shopAddressProvince: element.province,
    };

    return product;
  });

  return products;
};

export const getViewedProducts = async (numberOfProducts: number) => {
  const { data } = await http.get(apiEndpoint + "LastViewedProducts", {
    params: {
      numberOfProducts,
    },
  });

  const products: Array<ProductCard> = data.map((element: any) => {
    const product: ProductCard = {
      id: element.id,
      name: element.name,
      avatarUrl: element.coverImage,
      starRate: element.starRate,
      quantitySold: element.quantitySold,
      price: element.price,
      shopAddressProvince: element.province,
    };

    return product;
  });

  return products;
};

export const getRecommendedProducts = async (
  pageSize: number = 1,
  pageNumber: number = 0
) => {
  const { data } = await http.get(apiEndpoint + "RecommendedProducts", {
    params: {
      pageSize,
      pageNumber,
    },
  });

  const { products: productsFromData, totalProducts } = data;

  const products: Array<ProductCard> = productsFromData.map((element: any) => {
    const product: ProductCard = {
      id: element.id,
      name: element.name,
      avatarUrl: element.coverImage,
      starRate: element.starRate,
      quantitySold: element.quantitySold,
      price: element.price,
      shopAddressProvince: element.province,
    };

    return product;
  });

  return { products, totalProducts };
};
