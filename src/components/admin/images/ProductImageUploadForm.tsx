"use client";
import { Product } from "@/src/data/productTypes";
import { ChangeEvent, SubmitEvent } from "react";
export default function ProductImageUploadForm({
  products,
}: {
  products: Product[];
}) {
  const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_GCS_MEDIA_URL_BASE;
  async function upload(file: File, productId: number) {
    console.log("uploading", file, productId);
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`/api/products/${productId}/image`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    console.log(result);
  }
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file-input");
    const productId = formData.get("product-id-input");

    if (!(file instanceof File)) {
      return;
    }

    if (typeof productId !== "string") {
      return;
    }

    const id = Number(productId);

    if (!Number.isInteger(id)) {
      return;
    }

    upload(file, id);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    productId: number,
  ) => {
    const file = e.target.files?.[0];

    if (!(file instanceof File)) {
      return;
    }

    upload(file, productId);
  };
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="font-serif font-medium text-xl">Add product image</h2>
      {/* <form onSubmit={handleSubmit} className="flex flex-col max-w-80 gap-4"> */}
      {/*   <div className="flex flex-col"> */}
      {/*     <label htmlFor="product-id-input">Product ID</label> */}
      {/*     <input */}
      {/*       className="border" */}
      {/*       id="product-id-input" */}
      {/*       type="number" */}
      {/*       name="product-id-input" */}
      {/*     /> */}
      {/*   </div> */}
      {/**/}
      {/*   <div className="flex flex-col"> */}
      {/*     <label htmlFor="product-id-input">Image file</label> */}
      {/*     <input */}
      {/*       className="rounded-lg bg-gray-light p-2 cursor-pointer btn__secondary " */}
      {/*       name="file-input" */}
      {/*       type="file" */}
      {/*       accept="image/*" */}
      {/*     />{" "} */}
      {/*   </div> */}
      {/*   <button */}
      {/*     className="btn__accent cursor-pointer h-10 p2 rounded-lg" */}
      {/*     type="submit" */}
      {/*   > */}
      {/*     Submit */}
      {/*   </button> */}
      {/* </form> */}
      <h2 className="font-serif font-medium text-xl">Products</h2>
      <table className="border-collapse border border-gray-light-hover">
        <thead>
          <tr className="text-left bg-gray-light h-8">
            <th>{"id"}</th>
            <th>{"slug"}</th>
            <th>{"name"}</th>
            <th>{"image"}</th>
            <th>{"upload"}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr className="text-left min-h-8 even:bg-gray-light-hover" key={i}>
              <th>{p.id}</th>
              <td>{p.slug}</td>
              <td>{p.name}</td>
              <td>
                <img
                  src={`${MEDIA_BASE_URL}/media/product/${p.id}/${320}.webp`}
                  className="w-30 h-48 m-2 p-2 border border-primary  object-cover"
                  alt={`${p.slug}-thumbnail`}
                ></img>
              </td>
              <td>
                <input
                  className="rounded-lg bg-gray-light p-2 cursor-pointer border border-gray-mid btn__secondary"
                  name="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e, p.id)}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
