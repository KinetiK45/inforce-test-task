import React from 'react';
import {
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
  Container, Stack, Button,
} from '@mui/material';
import { IProduct } from '../interfaces/IProduct';
import {ProductItemView} from "./views/ProductItemView";

interface ProductListProps {
  products: IProduct[];
  onAdd: () => void;
  onDelete: (product: IProduct) => void;
  onSortChange: (sortField: keyof IProduct, sortOrder: 'asc' | 'desc') => void;
  sortField: keyof IProduct;
  sortOrder: 'asc' | 'desc';
}

export const ProductList: React.FC<ProductListProps> = ({
                                                            products,
                                                            onAdd,
                                                            onDelete,
                                                            onSortChange,
                                                            sortField,
                                                            sortOrder,
                                                          }) => {
  const handleSortFieldChange = (event: SelectChangeEvent<keyof IProduct>) => {
    onSortChange(event.target.value as keyof IProduct, sortOrder);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    onSortChange(sortField, event.target.value as 'asc' | 'desc');
  };

  return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
              variant="contained"
              color="primary"
              onClick={onAdd}
              sx={{ mr: 2 }}
          >
            Add Product
          </Button>
          <Select
              value={sortField}
              onChange={handleSortFieldChange}
              displayEmpty
              sx={{ mr: 2 }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="count">Count</MenuItem>
          </Select>

          <Select value={sortOrder} onChange={handleSortOrderChange} displayEmpty>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Box>

        <Stack direction="column" alignItems="center" spacing={2}>
          {products.map((product) => (
              <ProductItemView key={product.id} product={product} onDelete={onDelete}/>
          ))}
        </Stack>
      </Container>
  );
};