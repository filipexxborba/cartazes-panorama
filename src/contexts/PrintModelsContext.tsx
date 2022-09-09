import { createContext, useState } from "react";
import PrintModel1A6 from "../components/PrintModels/A6/PrintModel1A6";
import PrintModel2A6 from "../components/PrintModels/A6/PrintModel2A6";
import PrintModel3A6 from "../components/PrintModels/A6/PrintModel3A6";
import PrintModel4A6 from "../components/PrintModels/A6/PrintModel4A6";
import PrintModel6A6 from "../components/PrintModels/A6/PrintModel6A6";
import PrintModel7A6 from "../components/PrintModels/A6/PrintModel7A6";
import PrintModel1 from "../components/PrintModels/PrintModel1";
import PrintModel2 from "../components/PrintModels/PrintModel2";
import PrintModel3 from "../components/PrintModels/PrintModel3";
import PrintModel4 from "../components/PrintModels/PrintModel4";
import PrintModel6 from "../components/PrintModels/PrintModel6";
import PrintModel7 from "../components/PrintModels/PrintModel7";
import { IProduct } from "../components/Product/ProductItem";
import { debug } from "../consts/debug";

interface IContext {
  children: JSX.Element[] | JSX.Element;
}

interface IPrintList {
  index: string;
  element: JSX.Element;
}

export interface IContextValue {
  listToPrint: IPrintList[];
  setListToPrint: Function;
  addToList: Function;
  removeIndexInList: Function;
}

export const PrintModelsContext = createContext<IContextValue | null>(null);

// Tipo 1
// title,
// subtitle,
// valuePreviously,
// value,
// ref_int,
// unidade_venda,

// Tipo 2
// title,
// subtitle,
// valuePreviously,
// value,
// unidade_venda,
// ref_int,
// stock,

// Tipo 3
// title,
// subtitle,
// valuePreviously,
// value,
// ref_int,
// quant_parc,
// unidade_venda,

// Tipo 4
// title,
// subtitle,
// quant_parc,
// value,
// valuePreviously,
// ref_int,
// unidade_venda,

// Tipo 5
// title
// value

// Tipo 6
// title,
// subtitle,
// value,
// unidade_venda,
// ref_int,

// Tipo 7
// title,
// subtitle,
// quant_parc,
// value,
// unidade_venda,
// ref_int,
// validate,

export const PrintModelsProvider = ({ children }: IContext) => {
  const [listToPrint, setListToPrint] = useState<IPrintList[]>([]);

  const addToList = (
    layoutInfo: {
      product: string;
      layout: string;
      mostrar_perc: boolean;
      mostrar_avista: boolean;
      start_date: string;
      end_date: string;
      page: string;
    },
    productInfo: IProduct
  ) => {
    const layoutIndex = productInfo.posters_layouts?.findIndex(
      (layout) => layout.id === layoutInfo.layout
    );
    if (layoutIndex !== -1) {
      if (layoutInfo.page === "A4") {
        switch (layoutInfo.layout) {
          case "1":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel1
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "2":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel2
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    stock={productInfo.posters_layouts![layoutIndex!].stock}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "3":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel3
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "4":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel4
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    ref_int={productInfo.ref_int}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "6":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "7":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel7
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    validate={
                      productInfo.posters_layouts![layoutIndex!].validate
                    }
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
        }
      } else {
        switch (layoutInfo.layout) {
          case "1":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel1A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "2":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel2A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    stock={productInfo.posters_layouts![layoutIndex!].stock}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "3":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel3A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "4":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel4A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    valuePreviously={
                      productInfo.posters_layouts![layoutIndex!].valuePreviously
                    }
                    ref_int={productInfo.ref_int}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "6":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel6A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
          case "7":
            setListToPrint((prev) => [
              ...prev,
              {
                index: `${layoutInfo.product}${layoutInfo.layout}`,
                element: (
                  <PrintModel7A6
                    title={productInfo.product_title}
                    subtitle={productInfo.product_subtitle}
                    value={productInfo.posters_layouts![layoutIndex!].value}
                    unidade_venda={
                      productInfo.posters_layouts![layoutIndex!].unidadeVenda
                    }
                    ref_int={productInfo.ref_int}
                    validate={
                      productInfo.posters_layouts![layoutIndex!].validate
                    }
                    quant_parc={productInfo.posters_layouts![layoutIndex!].parc}
                    isEditing={false}
                    mostrar_avista={layoutInfo.mostrar_avista}
                    mostrar_percentual={layoutInfo.mostrar_perc}
                    startDate={layoutInfo.start_date}
                    endDate={layoutInfo.end_date}
                  />
                ),
              },
            ]);
            break;
        }
      }
    }
    debug && console.log("lista pra printar:", listToPrint);
  };

  const removeIndexInList = (product: string, layout: string) => {
    let temp: any[] = [];
    const currentList = listToPrint;
    const verify = `${product}${layout}`;
    debug && console.log(verify);
    currentList.map((item) => (item.index !== verify ? temp.push(item) : null));
    setListToPrint(temp);
    debug && console.log("nova lista: ", listToPrint);
  };

  return (
    <PrintModelsContext.Provider
      value={{
        listToPrint,
        setListToPrint,
        addToList,
        removeIndexInList,
      }}
    >
      {children}
    </PrintModelsContext.Provider>
  );
};
