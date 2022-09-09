import { useEffect, useState } from "react";
import { IItem } from "../../../@types/Item";
import model from "../../../assets/model.webp";
import { dateFormate } from "../../../utils/isSaleValidity";
import { parseProductValue } from "../../../utils/parseProductValue";

const PrintModel4A6 = ({
  title,
  subtitle,
  quant_parc,
  value,
  valuePreviously,
  ref_int,
  unidade_venda,
  mostrar_percentual,
  mostrar_avista,
  startDate,
  endDate,
}: IItem) => {
  const [valueFormated, setValueFormated] = useState<string[]>([]);
  const [valuePreviouslyFormated, setValuePreviouslyFormated] = useState<
    string[]
  >([]);
  const [percentValue, setPercentValue] = useState<number>();
  const [discountValue, setDiscountValue] = useState<string[]>([]);

  useEffect(() => {
    let parcValue = (
      parseFloat(value!.replaceAll(",", ".")) / quant_parc!
    ).toFixed(2);
    setValuePreviouslyFormated(parseProductValue(valuePreviously!));
    setValueFormated(parseProductValue(parcValue));
    setPercentValue(
      100 - (parseFloat(value!) * 100) / parseFloat(valuePreviously!)
    );
    let discount = parseFloat(valuePreviously!) - parseFloat(value!);
    setDiscountValue(parseProductValue(discount.toString()));
  }, [value, valuePreviously]);
  return (
    <div id="model-bg" className="relative">
      <img src={model} className="print:opacity-0 print:invisible" />
      <div className="absolute top-[300px] w-[1656px] px-14">
        <h1 className="text-[200px] font-bold w-full text-center font-['Creighton'] leading-[200px]">
          {title!.toUpperCase()}
        </h1>
        <h2 className=" text-[64px] font-medium text-center mt-2 font-['Creighton']">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="flex gap-8 items-center w-[1656px] mt-16 px-16">
          <p className="text-6xl font-bold">DE:</p>
          <div className="flex items-start" id="h">
            <h3 className="text-8xl font-bold">
              R$ {valuePreviouslyFormated[0]}
            </h3>
            <h4 className="text-7xl font-bold">{valuePreviouslyFormated[1]}</h4>
            <span className="previously">aa</span>
          </div>
        </div>
        <div className="w-[1656px] mt-8 flex items-center">
          <div className="flex flex-col items-start">
            <p className="text-[75px] font-bold">POR:</p>
            <h5 className="text-[100px] font-bold max-w-[400px] text-center p-8 leading-[1]">
              {quant_parc}X SEM JUROS
            </h5>
          </div>
          <div>
            <div className="flex">
              <h4 className="text-[450px] font-bold leading-[0.8]">
                {valueFormated[0]}
              </h4>
              <div className="flex flex-col">
                <span className="text-[250px] font-bold leading-[1]">
                  {valueFormated[1]}
                </span>
                <h5 className="w-full text-center text-[60px] font-bold mt-5 font-['Creighton']">
                  {unidade_venda!.toUpperCase()}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-20 flex items-center justify-between">
          <p className="font-bold text-5xl">Ref. Int: {ref_int}</p>
          <div className="flex items-center gap-6">
            <p className="text-5xl font-medium">À Vista:</p>
            <p className="text-8xl font-medium">
              R$ {value!.replaceAll(".", ",")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8 mt-20">
          <p className="text-5xl font-medium">ECONOMIA DE:</p>
          <p className="text-9xl font-bold">
            {mostrar_percentual
              ? `${percentValue?.toFixed(0)}%`
              : `R$${discountValue[0]}${discountValue[1]}`}
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

export default PrintModel4A6;
