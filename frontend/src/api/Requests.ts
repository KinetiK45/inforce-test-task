import axios from "axios";
import {IProduct} from "../interfaces/IProduct";

const domain = process.env.REACT_APP_BACKEND_API_URL;

const axiosInstance = axios.create({
  baseURL: domain,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export class Requests {
  static async getProductById(product_id: number | string) {
    const resp = await axiosInstance.get(`/products/${product_id}`);
    return resp.data;
  }

  static async getProducts(orderBy: string = 'name', order: 'asc' | 'desc' = 'asc'): Promise<IProduct[]> {
    const resp = await axiosInstance.get('/products', {
      params: { orderBy, order },
    });
    return resp.data;
  }

  static async createProduct(productData: object) {
    const resp = await axiosInstance.post(`/products`, productData);
    return resp.data;
  }

  static async updateProductDetails(product_id: number | string, fields: object) {
    const resp = await axiosInstance.patch(`/products/${product_id}`, fields);
    return resp.data;
  }

  static async deleteProduct(product_id: number | string) {
    const resp = await axiosInstance.delete(`/products/${product_id}`);
    return resp.data;
  }

  static async createComment(product_id: number | string, description: string) {
    const resp = await axiosInstance.post(
        `/products/${product_id}/comments`,
        description,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
    );
    return resp.data;
  }
}