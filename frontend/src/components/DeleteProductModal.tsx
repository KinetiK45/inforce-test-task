import React from 'react';
import { IProduct } from '../interfaces/IProduct';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteProductModalProps {
  onClose: () => void;
  onDeleteProduct: () => void;
  product: IProduct | null;
}

export function DeleteProductModal({ onClose, onDeleteProduct, product }: DeleteProductModalProps) {
  if (!product) return null;

  return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
          <Typography variant="h6" color="primary">
            {product.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            No
          </Button>
          <Button onClick={onDeleteProduct} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}