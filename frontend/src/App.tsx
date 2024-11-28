import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import './App.css';
import {ProductsListView} from "./pages/ProductsListView";
import {ProductView} from "./pages/ProductView";

function App() {
  const router = createBrowserRouter(
      createRoutesFromElements(
          <>
            <Route path="/" element={<ProductsListView />} />
            <Route path="/products/:product_id" element={<ProductView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
      )
  );
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
