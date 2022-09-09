import { Cardholder } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sale } from "../../@types/Sale";
import { debug } from "../../consts/debug";
import { apiUri } from "../../consts/uri";
import SaleItem from "./SaleItem";

const SaleWrapper = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [salesData, setSalesData] = useState<Sale[] | null>();
  const [filteredSalesData, setFilteredSalesData] = useState<Sale[] | null>();

  useEffect(() => {
    const callSalesApi = async () => {
      const response = await fetch(`${apiUri}/sales`);
      const sales = await response.json();
      debug && console.log(sales);
      setSalesData(sales);
      setFilteredSalesData(sales);
      setIsLoading(false);
    };
    callSalesApi();
  }, []);
  return (
    <div className="max-w-[600px] flex justify-center flex-col mx-auto">
      <div className="flex items-center gap-2  m-5 border-b border-b-slate-200 pb-3 text-emerald-900 ">
        <Cardholder size={24} weight="bold" />
        <h2 className=" font-bold text-xl">Campanhas cadastradas:</h2>
      </div>
      <ul className="flex flex-col gap-4 max-w-full my-5 mb-10 mx-4">
        {!isLoading ? (
          salesData && salesData.length > 0 ? (
            filteredSalesData!
              .sort((a, b) => {
                if (a.title > b.title) return 1;
                else return -1;
              })
              .map((sale) => (
                <Link to={`/admin/promocoes/editar/${sale._id}`}>
                  <SaleItem
                    _id={sale._id}
                    branch_list={sale.branch_list}
                    product_list={sale.product_list}
                    title={sale.title}
                    start_date={sale.start_date}
                    end_date={sale.end_date}
                  />
                </Link>
              ))
          ) : (
            <li>Nenhuma campanha cadastrada</li>
          )
        ) : (
          <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
        )}
      </ul>
    </div>
  );
};

export default SaleWrapper;
