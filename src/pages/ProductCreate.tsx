import Header from "../components/Header";
import ProductCreateForm from "../components/Product/ProductCreateForm";

import { PrintModelsProvider } from "../contexts/PrintModelsContext";

const ProductEdit = () => {
  return (
    <PrintModelsProvider>
      <Header isAdmin />
      <div className="max-w-[900px] mx-auto">
        <ProductCreateForm />
      </div>
    </PrintModelsProvider>
  );
};

export default ProductEdit;
