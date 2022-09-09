import { Sale } from "../../@types/Sale";
import { dateFormate } from "../../utils/isSaleValidity";
import { ArrowRight, CalendarBlank } from "phosphor-react";

const SaleItem = ({ branch_list, title, start_date, end_date }: Sale) => {
  return (
    <li className="bg-white rounded-md shadow-sm p-5 flex items-center justify-between gap-1 max-w-full border-l-2 border-l-emerald-600">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg text-slate-700 font-medium ">{title}</h2>
        <div className="flex items-center gap-2">
          <CalendarBlank size={24} className="text-slate-500" />
          <h3 className="text-md text-slate-500">
            {dateFormate(start_date)} até {dateFormate(end_date)}
          </h3>
        </div>
        <ul className="flex items-center gap-2 max-w-full">
          {branch_list &&
            branch_list.length > 0 &&
            branch_list
              .sort((a, b) => (a > b ? 1 : -1))
              .map((filial, index) => (
                <li
                  className="px-2 bg-green-800 rounded-sm text-white font-medium mt-2"
                  key={index}
                >
                  {filial < 10 ? `P0${filial}` : `P${filial}`}
                </li>
              ))}
        </ul>
      </div>
      <ArrowRight size={18} weight="duotone" className="text-slate-600" />
    </li>
  );
};

export default SaleItem;
