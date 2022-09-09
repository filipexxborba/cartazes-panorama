import Header from "../components/Header";
import ProductEditForm from "../components/Product/ProductEditForm";
import { PrintModelsProvider } from "../contexts/PrintModelsContext";

const ProductEdit = () => {
  return (
    <PrintModelsProvider>
      <Header isAdmin />
      <div className="max-w-[900px] mx-auto">
        <ProductEditForm />
      </div>
    </PrintModelsProvider>
  );
};

export default ProductEdit;
