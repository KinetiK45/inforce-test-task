import React, { useEffect, useState } from 'react';
import { ProductModal } from '../components/dialogs/ProductModal';
import { DeleteProductModal } from '../components/dialogs/DeleteProductModal';
import { ProductList } from '../components/ProductList';
import { IProduct } from '../interfaces/IProduct';
import { Button, Typography, Box } from '@mui/material';
import { Requests } from '../api/Requests';
import { debounce } from 'lodash';

export function ProductsListView() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [targetProduct, setTargetProduct] = useState<IProduct | undefined>(undefined);
  const [sortField, setSortField] = useState<keyof IProduct>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchProducts = async (sortBy: keyof IProduct, sortOrder: 'asc' | 'desc') => {
    try {
      const resp = await Requests.getProducts(sortBy, sortOrder);
      setProducts(resp);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const debouncedFetchProducts = debounce((sortBy, sortOrder) => fetchProducts(sortBy, sortOrder), 300);

  useEffect(() => {
    debouncedFetchProducts(sortField, sortOrder);
    return debouncedFetchProducts.cancel;
  }, [sortField, sortOrder]);

  const handleAddProduct = async (newProduct: IProduct) => {
    try {
      await Requests.createProduct(newProduct);
      debouncedFetchProducts(sortField, sortOrder);
      setShowAddProductModal(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteProduct = async () => {
    if (targetProduct) {
      try {
        await Requests.deleteProduct(targetProduct.id);
        debouncedFetchProducts(sortField, sortOrder);
        setShowDeleteProductModal(false);
        setTargetProduct(undefined);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleSortChange = (field: keyof IProduct, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Products List
        </Typography>

        <ProductList
            products={products}
            onAdd={() => setShowAddProductModal(true)}
            onDelete={(product) => {
              setTargetProduct(product);
              setShowDeleteProductModal(true);
            }}
            onSortChange={handleSortChange}
            sortField={sortField}
            sortOrder={sortOrder}
        />

        {showAddProductModal && (
            <ProductModal
                isEdit={false}
                onClose={() => setShowAddProductModal(false)}
                onSubmit={handleAddProduct}
            />
        )}

        {showDeleteProductModal && (
            <DeleteProductModal
                onClose={() => setShowDeleteProductModal(false)}
                onDeleteProduct={handleDeleteProduct}
                product={targetProduct}
            />
        )}
      </Box>
  );
}