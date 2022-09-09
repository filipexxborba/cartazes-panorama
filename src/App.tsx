import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import ProductEdit from "./pages/ProductEdit";
import Layout1Page from "./pages/Layout1Page";
import Layout2Page from "./pages/Layout2Page";
import Layout3Page from "./pages/Layout3Page";
import Layout4Page from "./pages/Layout4Page";
import Layout6Page from "./pages/Layout6Page";
import Layout7Page from "./pages/Layout7Page";
import ProductCreate from "./pages/ProductCreate";
import Sales from "./pages/Sales";
import SaleEditForm from "./components/Sale/SaleEditForm";
import SaleCreateForm from "./components/Sale/SaleCreateForm";
import Impressoes from "./pages/Impressoes";
import PrintPage from "./pages/PrintPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Products />} />
        {/* Produtos */}
        <Route path="/admin/produtos" element={<Products />} />
        <Route path="/admin/produtos/criar" element={<ProductCreate />} />
        <Route path="/admin/produtos/editar/:id" element={<ProductEdit />} />
        {/* Cartazes */}
        <Route
          path="/admin/layout/1/:title&:subtitle&:valuePreviously&:value&:ref_int&:unidade_venda&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout1Page />}
        />
        <Route
          path="/admin/layout/2/:title&:subtitle&:valuePreviously&:value&:ref_int&:unidade_venda&:stock&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout2Page />}
        />
        <Route
          path="/admin/layout/3/:title&:subtitle&:valuePreviously&:value&:ref_int&:unidade_venda&:parc&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout3Page />}
        />
        <Route
          path="/admin/layout/4/:title&:subtitle&:valuePreviously&:value&:ref_int&:unidade_venda&:parc&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout4Page />}
        />
        <Route
          path="/admin/layout/6/:title&:subtitle&:value&:ref_int&:unidade_venda&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout6Page />}
        />
        <Route
          path="/admin/layout/7/:title&:subtitle&:value&:ref_int&:unidade_venda&:parc&:mostrar_avista&:mostrar_percentual&:startDate&:endDate"
          element={<Layout7Page />}
        />
        {/* Promocoes */}
        <Route path="/admin/promocoes" element={<Sales />} />
        <Route path="/admin/promocoes/editar/:id" element={<SaleEditForm />} />
        <Route path="/admin/promocoes/criar" element={<SaleCreateForm />} />
        {/* Filiais */}
        <Route path="/impressoes/:id" element={<Impressoes />} />
        <Route path="/imprimir/" element={<PrintPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
