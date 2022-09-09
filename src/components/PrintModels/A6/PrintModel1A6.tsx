import { IItem } from "../../../@types/Item";
import model from "../../../assets/model.webp";
import { parseProductValue } from "../../../utils/parseProductValue";
import { useState, useEffect } from "react";
import { dateFormate } from "../../../utils/isSaleValidity";

const PrintModel1A6 = ({
  title,
  subtitle,
  valuePreviously,
  value,
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
    setValuePreviouslyFormated(parseProductValue(valuePreviously!));
    setValueFormated(parseProductValue(value!));
    setPercentValue(
      100 - (parseFloat(value!) * 100) / parseFloat(valuePreviously!)
    );
    let discount = parseFloat(valuePreviously!) - parseFloat(value!);
    setDiscountValue(parseProductValue(discount.toString()));
  }, [value, valuePreviously]);
  return (
    <div id="model-bg" className="relative">
      <img
        src={model.toUpperCase()}
        className="print:opacity-0 print:invisible"
      />
      <div className="absolute top-[300px] w-[1656px] px-20">
        <h1 className="text-[200px] font-bold w-full text-center font-['Creighton'] leading-[200px]">
          {title.toUpperCase()}
        </h1>
        <h2 className=" text-[65px] font-medium text-center mt-2 font-['Creighton'] leading-[200px]">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="flex items-start mt-80">
          <div className="flex  gap-12 w-full mt-8 items-start">
            <div className="flex flex-col items-start">
              <p className="text-8xl font-bold">DE:</p>
              <p className="text-6xl font-bold mt-8">R$</p>
            </div>
            <div className="flex items-start" id="h">
              <h3 className="text-[175px] font-bold leading-[.8]">
                {valuePreviouslyFormated[0]}
              </h3>
              <h4 className="text-[175px] font-bold leading-[.8]">
                {valuePreviouslyFormated[1]}
              </h4>
              <span className="previously4">aa</span>
            </div>
          </div>
          <div className="flex flex-col items-center mt-5 px-24 pb-8 border-[10px] border-dashed border-black rounded-[50px] ">
            <p className="text-[60px] font-medium">ECONOMIZE</p>
            <p
              className={
                mostrar_percentual
                  ? "text-[180px] font-bold leading-[.8]"
                  : "text-[80px] font-bold leading-[.8]"
              }
            >
              {mostrar_percentual
                ? `${percentValue?.toFixed(0)}%`
                : `R$${discountValue[0]}${discountValue[1]}`}
            </p>
          </div>
        </div>
        <p className="text-8xl font-bold">POR:</p>
        <div className="w-full mt-12 flex items-start">
          <span className="text-6xl font-bold">R$</span>
          <div className="flex">
            <h4 className="text-[500px] font-bold leading-[0.8]">
              {valueFormated[0]}
            </h4>
            <div className="flex flex-col">
              <span className="text-[250px] font-bold leading-[.8]">
                {valueFormated[1]}
              </span>
              <h5 className="w-full text-center text-[75px] font-bold ml-10">
                {unidade_venda!.toUpperCase()}
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row mt-20 justify-between">
          <p className="text-[50px] mb-5 font-bold">Ref. Int: {ref_int}</p>
          {mostrar_avista && (
            <p className="text-[50px] mb-5 font-bold">Pagamento À Vista</p>
          )}
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

export default PrintModel1A6;
