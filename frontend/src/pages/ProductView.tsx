import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Requests } from "../api/Requests";
import { IProduct } from "../interfaces/IProduct";
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Box } from "@mui/material";
import {CommentView} from "../components/CommentView";

export function ProductView() {
  const { product_id } = useParams();
  const [productData, setProductData] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!product_id) return;
      const resp = await Requests.getProductById(product_id);
      setProductData(resp);
    };
    fetchData();
  }, [product_id]);

  return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          Product View
        </Typography>
        <Typography variant="h5" gutterBottom>
          Product ID: {product_id}
        </Typography>

        {productData ? (
            <Card sx={{ maxWidth: 600, margin: 'auto' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <img
                        src={productData.imageUrl}
                        alt={productData.name}
                        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h4">{productData.name}</Typography>
                    <Typography variant="h6" color="textSecondary">
                      Count: {productData.count}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Size: {productData.size.width} x {productData.size.height}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Weight: {productData.weight}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ marginTop: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Comments:
                  </Typography>
                  {productData.comments.length > 0 ? (
                      <div>
                        {productData.comments.map((comment) => (
                            <CommentView key={comment.id} comment={comment} />
                        ))}
                      </div>
                  ) : (
                      <Typography variant="body1">No comments available.</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
        ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <CircularProgress />
            </Box>
        )}
      </Box>
  );
}