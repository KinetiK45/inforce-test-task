import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IProduct } from '../interfaces/IProduct';

interface ProductTableProps {
  products: IProduct[];
  onDelete: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
  onSortChange: (sortField: keyof IProduct, sortOrder: 'asc' | 'desc') => void;
  sortField: keyof IProduct;
  sortOrder: 'asc' | 'desc';
}

export const ProductTable: React.FC<ProductTableProps> = ({
                                                            products,
                                                            onDelete,
                                                            onEdit,
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
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">{product.count}</TableCell>
                    <TableCell align="right">{product.weight}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => onEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => onDelete(product)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
};