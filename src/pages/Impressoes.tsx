import Header from "../components/Header";
import PrintTable from "../components/PrintTable";
import { PrintModelsProvider } from "../contexts/PrintModelsContext";

const Impressoes = () => {
  return (
    <>
      <Header isAdmin={false} />
      <PrintModelsProvider>
        <PrintTable />
      </PrintModelsProvider>
    </>
  );
};

export default Impressoes;
