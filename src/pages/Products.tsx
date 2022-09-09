import Header from "../components/Header";
import ProductWrapper from "../components/Product/ProductWrapper";
import AddButton from "../components/AddButton";

const Admin = () => {
  return (
    <>
      <Header isAdmin={true} />
      <ProductWrapper />
      <AddButton destinate="/admin/produtos/criar" />
    </>
  );
};

export default Admin;
