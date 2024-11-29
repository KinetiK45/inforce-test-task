import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Requests } from "../api/Requests";
import { IProduct } from "../interfaces/IProduct";
import { Box, Button } from "@mui/material";
import { ProductView } from "../components/views/ProductView";

export function ProductPageView() {
  const { product_id } = useParams();
  const [productData, setProductData] = useState<IProduct | undefined>(undefined);
  const navigate = useNavigate();

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
        <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/products")}
            sx={{ marginBottom: 2 }}
        >
          Back to All Products
        </Button>

        {productData && (
            <ProductView
                product={productData}
                onChange={async () => {
                  const resp = await Requests.getProductById(productData.id);
                  setProductData(resp);
                }}
            />
        )}
      </Box>
  );
}