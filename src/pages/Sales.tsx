import AddButton from "../components/AddButton";
import Header from "../components/Header";
import SaleWrapper from "../components/Sale/SaleWrapper";

const Sales = () => {
  return (
    <div>
      <Header isAdmin />
      <SaleWrapper />
      <AddButton destinate="/admin/promocoes/criar" />
    </div>
  );
};

export default Sales;
