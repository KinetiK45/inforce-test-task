import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { IProduct } from "../../interfaces/IProduct";
import { Requests } from "../../api/Requests";
import { ProductModal } from "../dialogs/ProductModal";
import {CommentView} from "./CommentView";

interface ProductViewProps {
  product: IProduct;
  onChange: () => void;
}

export function ProductView({ product, onChange }: ProductViewProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const handleEditProduct = async (editedProduct: IProduct) => {
    try {
      await Requests.updateProductDetails(editedProduct.id, {
        ...editedProduct,
        size: { width: editedProduct.size.width, height: editedProduct.size.height },
      }).then(() => onChange());
    } catch (error) {
      console.error("Failed to edit product:", error);
    }
  };

  const handleCommentDelete = async (comment_id: number | string) => {
    try {
      await Requests.deleteComment(comment_id).then(() => onChange());
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleAddComment = async (product_id: number | string, description: string) => {
    if (description.trim() === "") return;
    try {
      await Requests.createComment(product_id, description).then(() => {
        setNewComment("");
        onChange();
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!product) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
    );
  }

  return (
      <Card sx={{ maxWidth: 700, margin: "auto", marginTop: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "auto", borderRadius: 8, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: 1 }}>
                Quantity: {product.count}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: 1 }}>
                Size: {product.size.width} x {product.size.height}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: 2 }}>
                Weight: {product.weight}
              </Typography>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  onClick={() => alert("Added to cart!")}
              >
                Add to Cart
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: 2 }}
                  onClick={() => setShowEditProductModal(true)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
              Comments:
            </Typography>
            <Box sx={{ marginBottom: 2, display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  size="small"
              />
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddComment(product.id, newComment)}
                  sx={{ minWidth: 100 }}
              >
                Create
              </Button>
            </Box>
            {product.comments.length > 0 ? (
                product.comments.map((comment) => (
                    <CommentView comment={comment} onDelete={handleCommentDelete}/>
                ))
            ) : (
                <Typography variant="body2" sx={{ color: "#777" }}>
                  No comments available.
                </Typography>
            )}
          </Box>
        </CardContent>
        {showEditProductModal && (
            <ProductModal
                isEdit={true}
                product={product}
                onClose={() => setShowEditProductModal(false)}
                onSubmit={handleEditProduct}
            />
        )}
      </Card>
  );
}