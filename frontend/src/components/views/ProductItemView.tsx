import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";
import { Typography, Avatar, Paper, Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

interface ProductItemViewProps {
  product: IProduct;
  onDelete: (product: IProduct) => void;
}

export function ProductItemView({ product, onDelete }: ProductItemViewProps) {
  return (
      <Paper
          elevation={3}
          sx={{
            padding: 1,
            margin: "10px auto",
            width: "960px",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f9f9f9",
            "&:hover": {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
          <Avatar
              alt={product.name}
              src={product.imageUrl}
              sx={{ width: 80, height: 80, border: "1px solid #ddd" }}
          />
          <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit", flex: 1 }}
          >
            <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  "&:hover": { textDecoration: "underline" },
                }}
            >
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.weight} | {product.size.width}x{product.size.height}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {product.count}
            </Typography>
          </Link>
        </Stack>
        <IconButton
            color="error"
            onClick={() => onDelete(product)}
            sx={{
              mb: 'auto',
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
  );
}