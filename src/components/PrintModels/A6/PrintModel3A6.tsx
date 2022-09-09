import { useEffect, useState } from "react";
import { IItem } from "../../../@types/Item";
import { parseProductValue } from "../../../utils/parseProductValue";
import model from "../../../assets/model.webp";
import { dateFormate } from "../../../utils/isSaleValidity";

const PrintModel3A6 = ({
  title,
  subtitle,
  valuePreviously,
  value,
  ref_int,
  quant_parc,
  unidade_venda,
  mostrar_percentual,
  mostrar_avista,
  startDate,
  endDate,
}: IItem) => {
  const [mainValueFormated, setMainValueFormated] = useState<string[]>([]);
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
    setMainValueFormated(parseProductValue(value!));
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
          {title.toUpperCase()}
        </h1>
        <h2 className=" text-[80px] font-medium text-center mt-2 font-['Creighton'] ">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="flex gap-8 items-center w-[1656px] mt-60 px-16">
          <p className="text-6xl font-bold">DE:</p>
          <div className="flex items-start" id="h">
            <h3 className="text-[128px] font-bold">
              R$ {valuePreviouslyFormated[0]}
            </h3>
            <h4 className="text-[110px] font-bold">
              {valuePreviouslyFormated[1]}
            </h4>
            <span className="previously3"></span>
          </div>
        </div>
        <div className="w-[1656px] flex items-start mt-8">
          <p className="text-7xl font-bold">POR R$:</p>
          <div className="flex">
            <h4 className="text-[400px] font-bold leading-[0.8]">
              {mainValueFormated[0]}
            </h4>
            <div className="flex flex-col">
              <span className="text-[200px] font-bold leading-[1] ">
                {mainValueFormated[1]}
              </span>
              <h5 className="w-full text-center text-[75px] font-bold mt-5 font-['Creighton']">
                {unidade_venda!.toUpperCase()}
              </h5>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-5xl mt-64">Ref. Int: {ref_int}</p>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex items-end mt-10 gap-6 horizontalStroke">
            <span></span>
            <div className="flex flex-col items-start">
              <p className="text-7xl font-bold">OU ATÉ</p>
              <p className="text-[140px] font-bold leading-[1]">
                {quant_parc}X
              </p>
            </div>
            <p className="text-[100px] font-bold leading-[1.1]">de</p>
            <div className="flex items-end">
              <p className="text-[90px] font-bold leading-[1.2]">R$</p>
              <div className="flex items-start">
                <div className="flex flex-col items-start justify-end relative">
                  <p className="text-[140px] self-end font-bold leading-[1]">
                    {valueFormated[0]}
                  </p>
                  <p className="text-[40px] block w-[300px] font-bold absolute -bottom-14 left-0">
                    SEM JUROS
                  </p>
                </div>
                <p className="text-[100px] font-bold leading-[1]">
                  {valueFormated[1]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end mt-10 gap-6 horizontalStroke">
            <span></span>
            <div className="flex flex-col items-center">
              <p className="font-medium text-6xl">ECONOMIZE:</p>
              <p className="font-bold text-[150px] leading-[1]">
                {percentValue?.toFixed(0)}%
              </p>
            </div>
          </div>
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

export default PrintModel3A6;
