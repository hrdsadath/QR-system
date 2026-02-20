"use client";

import { useState } from "react";
import { db,auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function Home() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  const router = useRouter();


  const searchProduct = async () => {
    if (!barcode) return alert("Enter barcode");

    const docRef = doc(db, "products", barcode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct(docSnap.data());
    } else {
      alert("Product not found");
      setProduct(null);
    }
    

  };
   const goToAdmin = () => {
    if (auth.currentUser) {
      router.push("/admin/add-product");
    } else {
      router.push("/login");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Product Lookup</h1>

      <input
        placeholder="Enter Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />

      <button onClick={searchProduct}>Search</button>

      {product && (
        <div style={{ marginTop: 30 }}>
          {/* <img
            src={product.image}
            alt="product"
            width="200"
          /> */}

          <h2>{product.name}</h2>
          <h3>₹sp {product.sp}</h3>
          <h3>₹cp {product.cp}</h3>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <p>Stock: {product.stock}</p>
        </div>
      )}
       <div
        onClick={goToAdmin}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          fontSize: 30,
          cursor: "pointer"
        }}
      >
        ➕
      </div>
    </div>
  );
}
