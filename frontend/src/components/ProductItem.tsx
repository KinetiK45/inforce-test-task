import React from 'react';
import { IProduct } from '../interfaces/IProduct';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

interface ProductItemProps {
  product: IProduct;
  onDelete: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
}

export function ProductItem({ product, onDelete, onEdit }: ProductItemProps) {
  return (
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Count: {product.count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: {product.weight}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button size="small" color="secondary" onClick={() => onDelete(product)}>
            Delete
          </Button>
        </CardActions>
      </Card>
  );
}