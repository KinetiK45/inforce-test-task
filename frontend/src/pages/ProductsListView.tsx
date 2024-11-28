import React, { useEffect, useState, useCallback } from 'react';
import { AddProductModal } from '../components/AddProductModal';
import { DeleteProductModal } from '../components/DeleteProductModal';
import { ProductTable } from '../components/ProductTable';
import { IProduct } from '../interfaces/IProduct';
import { Button, Typography, Box } from '@mui/material';
import { Requests } from '../api/Requests';
import { debounce } from 'lodash';

export function ProductsListView() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
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

  const debouncedFetchProducts = useCallback(
      debounce((sortBy, sortOrder) => fetchProducts(sortBy, sortOrder), 300),
      []
  );

  useEffect(() => {
    debouncedFetchProducts(sortField, sortOrder);
    return debouncedFetchProducts.cancel;
  }, [sortField, sortOrder, debouncedFetchProducts]);

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
    if (productToDelete) {
      try {
        await Requests.deleteProduct(productToDelete.id);
        debouncedFetchProducts(sortField, sortOrder);
        setShowDeleteProductModal(false);
        setProductToDelete(null);
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

        <Box sx={{ marginBottom: 2 }}>
          <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAddProductModal(true)}
          >
            Add Product
          </Button>
        </Box>

        <ProductTable
            products={products}
            onDelete={(product) => {
              setProductToDelete(product);
              setShowDeleteProductModal(true);
            }}
            onEdit={(product) => console.log('Edit Product:', product)}
            onSortChange={handleSortChange}
            sortField={sortField}
            sortOrder={sortOrder}
        />

        {showAddProductModal && (
            <AddProductModal
                onClose={() => setShowAddProductModal(false)}
                onAddProduct={handleAddProduct}
            />
        )}

        {showDeleteProductModal && (
            <DeleteProductModal
                onClose={() => setShowDeleteProductModal(false)}
                onDeleteProduct={handleDeleteProduct}
                product={productToDelete}
            />
        )}
      </Box>
  );
}