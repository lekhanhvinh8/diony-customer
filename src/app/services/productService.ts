import http from "./httpService";
import { apiUrl } from "../../config.json";
import { ProductDetail, ProductRating } from "../models/productDetail";
import { ProductVariant, VariantValueInfo } from "../models/productVariant";
import { ProductCard } from "./../models/productCard";
import {
  ProductSelectProperty,
  ProductTypingProperty,
} from "../store/ui/productDetailPage";

const apiEndpoint = apiUrl + "product";

export const getProductDetail = async (productId: number) => {
  const { data: rawProduct } = await http.get(apiEndpoint + "/" + productId);

  const product: ProductDetail = {
    id: rawProduct.id,
    name: rawProduct.name,
    description: rawProduct.description,
    categoryId: rawProduct.categoryId,
    avatarUrl: rawProduct.coverImage,
    imageUrls: rawProduct.images,
    price: rawProduct.price,
    quantity: rawProduct.stock,
    starRate: rawProduct.starRate,
    numRates: rawProduct.numRates,
    quantitySold: rawProduct.quantitySold,
    variants: rawProduct.variants.map((variant: any) => {
      const newVariant: ProductVariant = {
        id: variant.id,
        name: variant.name,
        values: variant.options.map((option: any) => {
          return {
            id: option.id,
            name: option.name,
          };
        }),
      };

      return newVariant;
    }),
    variantValueInfos: rawProduct.combinations.map((combination: any) => {
      const newCombi: VariantValueInfo = {
        id: combination.id,
        firstValueId:
          combination.firstOptionId !== 0 ? combination.firstOptionId : null,
        secondValueId:
          combination.secondOptionId !== 0 ? combination.secondOptionId : null,
        price: combination.price,
        quantity: combination.stock,
      };

      return newCombi;
    }),
  };

  return product;
};

export const getProductProperties = async (productId: number) => {
  const { data: properties } = await http.get(
    apiEndpoint + "/GetProductProps/" + productId
  );

  const selectProperties: Array<ProductSelectProperty> =
    properties.selectProperties.map((property: any) => {
      const formatSelectProperty: ProductSelectProperty = {
        propertyId: property.id,
        propertyName: property.name,
        values: property.value,
      };

      return formatSelectProperty;
    });

  const typingProperties: Array<ProductTypingProperty> =
    properties.typingProperties.map((property: any) => {
      const formatTypingProperty: ProductTypingProperty = {
        propertyId: property.id,
        propertyName: property.name,
        value: property.value,
      };

      return formatTypingProperty;
    });

  return {
    selectProperties,
    typingProperties,
  };
};

export const getFilteredProductOfCategory = async (
  cateId: number,
  pageNumber: number,
  pageSize: number
) => {
  const { data } = await http.get(apiEndpoint + "/getByCategory/" + cateId, {
    params: {
      pageNumber,
      pageSize,
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

export const getRatings = async (
  productId: number,
  pageSize = 1,
  pageNumber = 0
) => {
  const { data } = await http.get<{
    ratings: Array<ProductRating>;
    totalRatings: number;
  }>(apiEndpoint + "/ratings", {
    params: {
      productId,
      pageSize,
      pageNumber,
    },
  });
  const { ratings, totalRatings } = data;
  return { ratings, totalRatings };
};
