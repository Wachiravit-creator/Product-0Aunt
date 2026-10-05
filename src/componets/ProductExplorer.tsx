"use client";

import { useState, useEffect } from "react";
import { defaultQuery, fetchProducts } from "@/lib/products";
import type {
  Product,
  ProductDraft,
  ProductList,
  SearchQuery,
} from "@/lib/products";
import ProductSearchForm from "./ProductSearchForm";
import ProductForm from "./ProductForm";

type LoadState = "loading" | "error" | "ready";

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  // สินค้าที่กำลังแก้ไข
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts(defaultQuery)
    .then(showResult)
    .catch(showError);
  }, []);

  function showResult(list: ProductList) {
    setProducts(list.products);
    setStatus("ready");
  }

  function showError(error: unknown) {
    setErrorMessage(
      error instanceof Error ? error.message : "เรียกข้อมูลไม่สำเร็จ"
    );
    setStatus("error");
  }

  // เพิ่ม / แก้ไขสินค้า
  function saveProduct(draft: ProductDraft) {
    if (editing) {
      // กรณีแก้ไขสินค้า
      setProducts(
        products.map((product) =>
          product.id === editing.id
            ? { ...draft, id: editing.id }
            : product
        )
      );

      // กลับไปโหมดเพิ่มสินค้า
      setEditing(null);
    } else {
      // กรณีเพิ่มสินค้าใหม่
      setProducts([
        ...products,
        {
          ...draft,
          id: Date.now(),
        },
      ]);
    }
  }

  // ลบสินค้า
  function removeProduct(id: number) {
    setProducts(
      products.filter((product) => product.id !== id)
    );

    // ถ้ากำลังแก้สินค้าที่ถูกลบ ให้กลับโหมดเพิ่ม
    if (editing?.id === id) {
      setEditing(null);
    }
  }

  async function loadProducts(query: SearchQuery) {
    setStatus("loading");
    setErrorMessage("");

    try {
      showResult(await fetchProducts(query));
    } catch (error) {
      showError(error);
    }
  }

  return (
    <main>
      <h1>รายการสินค้า</h1>

      <button
        type="button"
        onClick={() => loadProducts(defaultQuery)}
        disabled={status === "loading"}
      >
        {status === "loading" ? "กำลังโหลด" : "โหลดข้อมูล"}
      </button>

      <ProductSearchForm onSearch={loadProducts} />

      <section aria-live="polite">
        {status === "loading" && <p>กำลังโหลดข้อมูล</p>}

        {status === "error" && (
          <p role="alert">{errorMessage}</p>
        )}

        {status === "ready" && products.length === 0 && (
          <p>ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        )}

        {status === "ready" && products.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>รูปภาพ</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา</th>
                <th>คงเหลือ</th>
                <th>หมวดหมู่</th>
                <th>จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width="60"
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </td>

                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.category}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => setEditing(item)}
                    >
                      แก้ไข
                    </button>

                    <button
                      type="button"
                      onClick={() => removeProduct(item.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div>
        <ProductForm
          editing={editing}
          onSave={saveProduct}
          onCancel={() => setEditing(null)}
        />
      </div>
    </main>
  );
}