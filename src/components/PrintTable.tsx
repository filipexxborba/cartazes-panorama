import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sale } from "../@types/Sale";
import { debug } from "../consts/debug";
import { apiUri } from "../consts/uri";
import {
  IContextValue,
  PrintModelsContext,
} from "../contexts/PrintModelsContext";
import { checkSaleDateValidity } from "../utils/isSaleValidity";
import Prints from "./Sale/Prints";

const PrintTable = () => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const [allProductsData, setAllProductsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPrinter, setShowPrinter] = useState<boolean>(false);
  const [indexSelected, setIndexSelected] = useState<number[]>([]);
  const { id } = useParams();
  const { addToList, removeIndexInList } = useContext(
    PrintModelsContext
  ) as IContextValue;

  const getCurrentProductInfo = (refInt: string) => {
    const productInfo = allProductsData.filter(
      (product) => product.ref_int === parseInt(refInt)
    );
    return productInfo;
  };

  const handlePrintButton = (e: SyntheticEvent) => {
    e.preventDefault();
    setTimeout(() => {
      window.print();
    }, 1000);
    setShowPrinter(true);
    setTimeout(() => {
      setShowPrinter(false);
    }, 2000);
  };

  const selectCurrentItem = (
    layoutInfo: any,
    productInfo: any,
    index: number
  ) => {
    debug && console.log(layoutInfo, productInfo, index);
    let temp2: any = [];
    if (indexSelected.includes(index)) {
      let temp = indexSelected;
      temp.map((id) =>
        id !== index ? temp2.push(id) : console.log(`Excluindo o ID: ${id}`)
      );
      removeIndexInList(layoutInfo.product, layoutInfo.layout);
      setIndexSelected(temp2);
    } else {
      setIndexSelected((prev) => [...prev, index]);
      addToList(layoutInfo, productInfo, index);
    }
    debug && console.log(indexSelected);
  };

  useEffect(() => {
    const allSales = async () => {
      const response = await fetch(`${apiUri}/sales`);
      const sales = await response.json();
      debug && console.log(sales);
      let temp: any[] = [];
      sales.map((sale: Sale) => {
        debug && console.log(sale);
        if (
          sale.branch_list.includes(parseInt(id!)) &&
          checkSaleDateValidity(sale.start_date, sale.end_date)
        ) {
          if (sale.products_list!.length > 0) {
            sale.products_list!.map((product) => {
              temp.push({
                product: product,
                layout: sale.layout![0].layout_id,
                mostrar_perc: sale.layout![0].mostrar_perc,
                mostrar_avista: sale.layout![0].mostrar_avista,
                page: sale.layout![0].page ? sale.layout![0].page : "A4",
                start_date: sale.start_date,
                end_date: sale.end_date,
              });
            });
          }
          debug && console.log(temp);
        } else {
          debug && console.log("não ta valido");
        }
        setProductsData(temp);
      });
      const response2 = await fetch(`${apiUri}/products`);
      const products2 = await response2.json();
      setAllProductsData(products2);
      setIsLoading(false);
    };
    allSales();
  }, [id]);
  return (
    <>
      {!isLoading ? (
        <div className="max-w-full m-5 overflow-auto print:hidden ">
          <div className="table  w-full bg-gray-100 rounded-xl border border-slate-200">
            <div className="table table-auto w-full">
              <div className="table-header-group">
                <div className="table-row shadow-md">
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    Imprimir
                  </div>
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    Nome
                  </div>
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    Descrição
                  </div>
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    Layout
                  </div>
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    Porcentagem
                  </div>
                  <div className="table-cell text-center pt-5 px-4 pb-2 text-slate-500 font-medium text-sm">
                    À vista
                  </div>
                </div>
              </div>
              <div className="table-row-group bg-white">
                {productsData &&
                  !isLoading &&
                  productsData.map((product, index) => (
                    <div
                      key={index}
                      className="table-row cursor-pointer hover:bg-slate-50"
                      onClick={() =>
                        selectCurrentItem(
                          product,
                          getCurrentProductInfo(product.product)[0],
                          index
                        )
                      }
                    >
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 translate-y-[3px]"
                          checked={indexSelected.includes(index)}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        {getCurrentProductInfo(
                          product.product
                        )[0].product_title.toUpperCase()}
                      </div>
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        {getCurrentProductInfo(
                          product.product
                        )[0].product_subtitle.toUpperCase()}
                      </div>
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        {product.layout} - {product.page}
                      </div>
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        {product.mostrar_perc ? `Sim` : `Não`}
                      </div>
                      <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center">
                        {product.mostrar_avista ? `Sim` : `Não`}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="table-footer-group pt-4 bg-red">
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
                <div className="table-cell px-4 text-sm text-slate-500 font-normal py-3 border-t border-slate-200 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
      )}
      {indexSelected.length > 0 && (
        <div className="max-w-full m-5 print:hidden">
          <button
            onClick={(e) => handlePrintButton(e)}
            className="print:hidden bg-emerald-700 text-white px-4 py-2 font-medium rounded-sm"
          >
            {`Imprimir (${indexSelected.length})`}
          </button>
        </div>
      )}
      {showPrinter && <Prints />}
    </>
  );
};

export default PrintTable;
