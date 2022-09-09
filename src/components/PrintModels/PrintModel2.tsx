import { IItem } from "../../@types/Item";
import model from "../../assets/outlet.webp";
import { parseProductValue } from "../../utils/parseProductValue";
import { useEffect, useState } from "react";
import { dateFormate } from "../../utils/isSaleValidity";

const PrintModel2 = ({
  title,
  subtitle,
  valuePreviously,
  value,
  unidade_venda,
  ref_int,
  stock,
  _id,
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
      <img src={model} className="print:opacity-0 print:invisible" />
      <div className="absolute top-[600px] w-[1656px] px-20">
        <h1 className="text-[110px] font-bold w-full text-center">
          {title.toUpperCase()}
        </h1>
        <h2 className=" text-[40px] font-medium text-center">
          {subtitle!.toUpperCase()}
        </h2>
        <div className="w-[1656px]">
          <h3 className="text-[50px] mt-8 font-medium">COMPRANDO FRACIONADO</h3>
          <h3 className="text-[50px] font-medium">VOCÊ PAGA:</h3>
        </div>
        <div className="flex ml-72">
          <h4 className="text-[50px] font-bold">R$</h4>
          <h4 className="text-[250px] font-bold leading-[0.8]">
            {valuePreviouslyFormated[0]}
          </h4>
          <div className="flex flex-col">
            <span className="text-[100px] font-bold leading-[1]">
              {valuePreviouslyFormated[1]}
            </span>
            <h5 className="w-full text-center text-[40px] leading-3 font-bold mt-5">
              {unidade_venda}
            </h5>
          </div>
        </div>
        {/*  */}
        <div className="w-full px-10 pb-5 border-[10px] border-dashed border-black rounded-[50px] mt-20">
          <div className="flex items-start justify-between">
            <div className="">
              <h3 className="text-[50px] mt-8 font-medium">
                LEVANDO TODA A PONTA DE ESTOQUE
              </h3>
              <h3 className="text-[50px] font-medium">VOCÊ PAGA:</h3>
            </div>
            <div className="flex flex-col items-center mt-5 px-5 pb-8 border-[10px] border-dashed border-black rounded-[50px] ">
              <p className="text-[55px] font-medium">ECONOMIZE</p>
              <p
                className={
                  mostrar_percentual
                    ? "text-[180px] font-bold leading-[.8]"
                    : "text-[60px] font-bold leading-[.8]"
                }
              >
                {mostrar_percentual
                  ? `${percentValue?.toFixed(0)}%`
                  : `R$${discountValue[0]}${discountValue[1]}`}
              </p>
            </div>
          </div>
          <div className="flex ml-60 -mt-20">
            <h4 className="text-[100px] font-bold">R$</h4>
            <h4 className="text-[350px] font-bold leading-[0.8]">
              {valueFormated[0]}
            </h4>
            <div className="flex flex-col">
              <span className="text-[120px] font-bold leading-[1]">
                {valueFormated[1]}
              </span>
              <h5 className="w-full text-center text-[40px] leading-3 font-bold mt-5">
                {unidade_venda!.toUpperCase()}
              </h5>
            </div>
          </div>
          <div className="w-full mt-16 flex-row-reverse flex">
            <p className="text-[50px] font-medium">
              {stock?.replaceAll(".", ",")} {unidade_venda} DISPONÍVEL NO
              ESTOQUE
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row-reverse">
          {mostrar_avista && (
            <p className="text-[60px] mt-5 font-medium">Pagamento À Vista</p>
          )}
        </div>
        <div className="w-full flex flex-row">
          <p className="text-[50px] mb-5 font-medium">Ref. Int: {ref_int}</p>
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

export default PrintModel2;
