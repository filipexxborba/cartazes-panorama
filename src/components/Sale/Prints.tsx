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
    <div className="opacity-0 print:block print:opacity-100">
      {listToPrint.map((print, index) => (
        <div key={index}>{print.element}</div>
      ))}
    </div>
  );
};

export default Prints;
