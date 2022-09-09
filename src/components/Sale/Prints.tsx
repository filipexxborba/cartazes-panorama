import { useContext, useEffect } from "react";
import {
  IContextValue,
  PrintModelsContext,
} from "../../contexts/PrintModelsContext";

const Prints = () => {
  const { listToPrint } = useContext(PrintModelsContext) as IContextValue;
  useEffect(() => {
    console.log(listToPrint);
  }, []);
  return (
    <div className="hidden print:block">
      {listToPrint.map((print, index) => (
        <div key={index}>{print.element}</div>
      ))}
    </div>
  );
};

export default Prints;
