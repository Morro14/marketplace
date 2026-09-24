import ProductImageUploadForm from "@/src/components/admin/images/ProductImageUploadForm";
import { getProducts } from "@/src/data/productQueries";

export default async function ProductImageUpload() {
  const products = await getProducts();
  return (
    <>
      <ProductImageUploadForm products={products}></ProductImageUploadForm>
    </>
  );
}
