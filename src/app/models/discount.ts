
export interface Discount {
    "id": number;
    "code": string;
    "fromDate": string;
    "toDate": string;
    "description": string;
    "discountRate": number;
    "minOrderCost": number;
    "maxDiscount": number;
    "numberOfUsings": number;
    "maxUsings": number;
    "enabled": boolean;
    "createdDate": string
}