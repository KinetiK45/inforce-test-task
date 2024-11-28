import React, { useState } from 'react';
import { IProduct } from '../interfaces/IProduct';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: IProduct) => void;
}

export function AddProductModal({ onClose, onAddProduct }: AddProductModalProps) {
  const [productDetails, setProductDetails] = useState<IProduct>({
    id: Date.now(),
    name: '',
    count: 0,
    imageUrl: '',
    size: {
      width: 0,
      height: 0,
    },
    weight: '',
    comments: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'width' || name === 'height') {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        size: {
          ...prevDetails.size,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === 'count') {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        count: parseInt(value, 10),
      }));
    } else {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (
        productDetails.name &&
        productDetails.count >= 0 &&
        productDetails.imageUrl &&
        productDetails.size.width >= 0 &&
        productDetails.size.height >= 0 &&
        productDetails.weight
    ) {
      onAddProduct(productDetails);
      onClose();
    } else {
      alert('All fields must be filled');
    }
  };

  return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Product Name"
              fullWidth
              value={productDetails.name}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="count"
              label="Product Count"
              type="number"
              fullWidth
              value={productDetails.count}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="imageUrl"
              label="Product Image URL"
              fullWidth
              value={productDetails.imageUrl}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="width"
              label="Product Width"
              type="number"
              fullWidth
              value={productDetails.size.width}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="height"
              label="Product Height"
              type="number"
              fullWidth
              value={productDetails.size.height}
              onChange={handleInputChange}
          />
          <TextField
              margin="dense"
              name="weight"
              label="Product Weight"
              fullWidth
              value={productDetails.weight}
              onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
  );
}