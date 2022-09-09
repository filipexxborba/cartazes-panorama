import model from "../../assets/model.webp";
import { IItem } from "../../@types/Item";

const PrintModel5 = ({ title, value }: IItem) => {
  return (
    <div id="model-bg" className="relative">
      <img src={model} className="print:opacity-0 print:invisible" />
      <div className="absolute top-[600px] max-w-[1656px]">
        <h1 className=" text-[150px] font-bold w-full text-center px-20 font-['Creighton'] leading-[200px]">
          {title}
        </h1>
        <div className="w-full px-20 mt-[60px] flex items-start justify-evenly">
          <div className="flex items-center gap-10">
            <h4 className="text-[900px] font-bold leading-[0.8] font-['Creighton']">
              {value}
            </h4>
            <div className="flex flex-col items-center">
              <span className="text-[400px] font-bold leading-[1] font-['Creighton']">
                %
              </span>
              <h5 className="w-full text-center text-[75px] font-medium mt-10 font-['Creighton']">
                DE DESCONTO
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full px-48 mt-48 flex flex-row-reverse items-end justify-between">
          <p className="font-medium text-7xl font-['Creighton']">
            Pagamento À Vista
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintModel5;
