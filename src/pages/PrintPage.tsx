import { useContext } from "react";
import Prints from "../components/Sale/Prints";
import { PrintModelsProvider } from "../contexts/PrintModelsContext";

const PrintPage = () => {
  return (
    <PrintModelsProvider>
      <Prints />
    </PrintModelsProvider>
  );
};

export default PrintPage;
