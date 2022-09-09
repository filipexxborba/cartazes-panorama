import { IItem } from "../../@types/Item";
import model from "../../assets/model.webp";
import { parseProductValue } from "../../utils/parseProductValue";
import { useEffect, useState } from "react";
import { dateFormate } from "../../utils/isSaleValidity";

const PrintModel7 = ({
  title,
  subtitle,
  quant_parc,
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
    let parcValue = (
      parseFloat(value!.replaceAll(",", ".")) / quant_parc!
    ).toFixed(2);
    setValueFormated(parseProductValue(parcValue));
  }, [value]);
  return (
    <div id="model-bg" className="relative">
      <img src={model} className="print:opacity-0 print:invisible" />
      <div className="absolute top-[600px] max-w-[1656px]">
        <h1 className=" text-[200px] font-bold w-full text-center px-20 font-['Creighton'] leading-[200px]">
          {title!.toUpperCase()}
        </h1>
        <h2 className=" text-6xl font-medium w-full text-center px-20 mt-12 font-['Creighton']">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="w-full px-20">
          <h3 className=" text-9xl font-bold w-full text-center px-40 py-5 mt-24 border-dashed border-[10px] rounded-[50px] border-black">
            {quant_parc}X SEM JUROS DE:
          </h3>
        </div>
        <div className="w-full px-20 mt-12 flex items-start justify-evenly">
          <span className="text-8xl font-bold">R$</span>
          <div className="flex">
            <h4 className="text-[400px] font-bold leading-[0.8]">
              {valueFormated[0]}
            </h4>
            <div className="flex flex-col">
              <span className="text-[300px] font-bold leading-[1]">
                {valueFormated[1]}
              </span>
              <h5 className="w-full text-center text-[50px] font-bold mt-10">
                {unidade_venda!.toUpperCase()}
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full px-20">
          <h6 className=" text-7xl font-medium w-full text-center px-40 py-5 mt-24 border-dashed border-[10px] rounded-[50px] border-black">
            PREÇO À VISTA: R$ {parseProductValue(value!)[0]}
            {parseProductValue(value!)[1]}
          </h6>
        </div>
        <div className="w-full px-20 mt-20 flex items-center justify-between">
          <p className="font-bold text-3xl">Ref. Int: {ref_int}</p>
          <p className="text-[32px] mb-5 font-bold">
            Oferta válida de: {dateFormate(new Date(startDate!))} à{" "}
            {dateFormate(new Date(endDate!))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintModel7;
