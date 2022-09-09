import { useState, useEffect } from "react";
import { IItem } from "../../@types/Item";
import model from "../../assets/model.webp";
import { dateFormate } from "../../utils/isSaleValidity";
import { parseProductValue } from "../../utils/parseProductValue";

const PrintModel6 = ({
  title,
  subtitle,
  value,
  unidade_venda,
  ref_int,
  mostrar_percentual,
  mostrar_avista,
  startDate,
  endDate,
}: IItem) => {
  const [valueFormated, setValueFormated] = useState<string[]>([]);
  useEffect(() => {
    setValueFormated(parseProductValue(value!));
  }, [value]);
  return (
    <div id="model-bg" className="relative">
      <img src={model} className="print:opacity-0 print:invisible" />
      <div className="absolute top-[750px] max-w-[1656px]">
        <h1 className=" text-[200px] font-bold w-full text-center px-14 font-['Creighton'] leading-[250px]">
          {title!.toUpperCase()}
        </h1>
        <h2 className=" text-6xl font-medium w-full text-center px-20 mt-20 font-['Creighton']">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="w-full px-20 mt-[200px] flex items-start justify-evenly">
          <span className="text-8xl font-bold">R$</span>
          <div className="flex">
            <h4 className="text-[450px] font-bold leading-[0.8]">
              {valueFormated[0]}
            </h4>
            <div className="flex flex-col">
              <span className="text-[250px] font-bold leading-[1]">
                {valueFormated[1]}
              </span>
              <h5 className="w-full text-center text-[50px] font-bold mt-10">
                {unidade_venda!.toUpperCase()}
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full px-20 mt-72 flex items-center justify-between">
          <p className="font-bold text-3xl">Ref. Int: {ref_int}</p>
          <p className="font-medium text-7xl font-['Creighton']">
            Pagamento À Vista
          </p>
        </div>
        <div className="w-full flex flex-row-reverse mt-20 justify-between">
          <p className="text-[32px] mb-5 font-bold">
            Oferta válida de: {dateFormate(new Date(startDate!))} à{" "}
            {dateFormate(new Date(endDate!))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintModel6;
