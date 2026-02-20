"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function AddProduct() {
  const [product, setProduct] = useState({
    barcode: "",
    name: "",
    sp: "",
    cp: "",
    category: "",
    stock: "",
    brand: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    try {
      if (!product.barcode) {
        alert("Barcode required");
        return;
      }

      await setDoc(doc(db, "products", product.barcode), {
        ...product,
        sp: Number(product.sp),
        cp: Number(product.cp),
        stock: Number(product.stock),
        createdAt: Timestamp.now()
      });

      alert("Product Added Successfully ✅");

      setProduct({
        barcode: "",
        name: "",
            sp: "",
            cp: "",
            category: "",
            stock: "",
            brand: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-black-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
            <input 
              name="barcode" 
              placeholder="Scan or Enter Barcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={product.barcode} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black -700 mb-1">Product Name</label>
            <input 
              name="name" 
              placeholder="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={product.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (CP)</label>
              <input 
                name="cp" 
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={product.cp} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (SP)</label>
              <input 
                name="sp" 
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={product.sp} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input 
                name="brand" 
                placeholder="Brand name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={product.brand} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input 
                name="stock" 
                type="number"
                placeholder="Quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={product.stock} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              name="category" 
              placeholder="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={product.category} 
              onChange={handleChange} 
            />
          </div>

          <button 
            onClick={addProduct}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 mt-4"
          >
            Add Product
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}
