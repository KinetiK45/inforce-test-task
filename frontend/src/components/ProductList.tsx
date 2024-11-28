import React from 'react';
import { ProductItem } from './ProductItem';
import { IProduct } from '../interfaces/IProduct';

interface ProductListProps {
  products: IProduct[];
  setShowDeleteProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProductToDelete: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

export function ProductList({ products, setShowDeleteProductModal, setProductToDelete }: ProductListProps) {
  return (
      <div>
        {products.map((product) => (
            <ProductItem
                key={product.id}
                product={product}
                onDelete={(product) => {
                  setProductToDelete(product);
                  setShowDeleteProductModal(true);
                }}
                onEdit={(product) => console.log("Edit", product)}
            />
        ))}
      </div>
  );
}