import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debug } from "../../consts/debug";
import { apiUri } from "../../consts/uri";
import { IProduct } from "./ProductItem";
import Layout1 from "../LayoutForms/Layout1";
import Layout2 from "../LayoutForms/Layout2";
import Layout3 from "../LayoutForms/Layout3";
import Layout4 from "../LayoutForms/Layout4";
import Layout6 from "../LayoutForms/Layout6";
import Layout7 from "../LayoutForms/Layout7";

const ProductCreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [refInt, setRefInt] = useState<string>("");
  const navigate = useNavigate();

  const handleSaveButton = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoadingSave(true);
    debug && console.log(title, subTitle, refInt);
    const response = await fetch(`${apiUri}/products/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        product_title: title.replaceAll("/", "-"),
        product_subtitle: subTitle.replaceAll("/", "-"),
        ref_int: refInt,
        posters_layouts: [],
      }),
    });
    debug && console.log(response.status);
    setIsLoadingSave(false);
    navigate("/admin/produtos");
  };

  return (
    <div className="w-full ">
      {!isLoading ? (
        <form className="bg-white m-5 p-5 flex items-start flex-col gap-4 rounded-md shadow-sm">
          <fieldset className="flex flex-col items-start gap-1 min-w-full ">
            <label
              className="font-medium text-lg text-slate-600"
              htmlFor="title"
            >
              Nome do produto:
            </label>
            <input
              className="min-w-full py-2 px-4 bg-slate-50 rounded-md"
              type="text"
              id="title"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col items-start gap-1 min-w-full ">
            <label
              className="font-medium text-lg text-slate-600"
              htmlFor="subTitle"
            >
              Descrição do produto:
            </label>
            <input
              className="min-w-full py-2 px-4 bg-slate-50 rounded-md"
              type="text"
              id="subTitle"
              value={subTitle}
              onChange={(e: any) => setSubTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col items-start gap-1 min-w-full ">
            <label
              className="font-medium text-lg text-slate-600"
              htmlFor="refInt"
            >
              Referência interna:
            </label>
            <input
              className="min-w-full py-2 px-4 bg-slate-50 rounded-md"
              type="text"
              id="refInt"
              value={refInt}
              onChange={(e: any) => setRefInt(e.target.value)}
            />
          </fieldset>
          <hr className="h-1 text-slate-300 w-full" />
          <h2 className="font-medium text-lg text-slate-600">
            Layout de impressões:
          </h2>
          {/* Layout 1 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-1")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 1</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-1" className="hidden">
            <Layout1
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          {/* Layout 2 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-2")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 2</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-2" className="hidden">
            <Layout2
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          {/* Layout 3 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-3")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 3</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-3" className="hidden">
            <Layout3
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          {/* Layout 4 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-4")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 4</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-4" className="hidden">
            <Layout4
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          {/* Layout 6 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-6")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 6</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-6" className="hidden">
            <Layout6
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          {/* Layout 7 */}
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer"
            onClick={() =>
              document.querySelector("#layout-7")?.classList.toggle("hidden")
            }
          >
            <legend className="text-lg text-slate-500">Layout 7</legend>
            <p className="text-md text-slate-500">Esconder/Mostrar</p>
          </div>
          <div id="layout-7" className="hidden">
            <Layout7
              title={title}
              subtitle={subTitle}
              ref_int={parseInt(refInt)}
              isEditing={false}
              mostrar_avista={false}
              mostrar_percentual={false}
            />
          </div>
          <hr className="h-1 text-slate-300 w-full mt-1" />
          <div className="flex flex-row-reverse gap-2">
            <button
              onClick={(e: SyntheticEvent) => handleSaveButton(e)}
              className="px-4 py-2 bg-green-600 text-white rounded-sm"
              disabled={!title && !subTitle && !refInt}
            >
              {isLoadingSave ? "Salvando" : "Salvar"}
            </button>
            <button
              onClick={(e: SyntheticEvent) => navigate("/admin/produtos")}
              className="px-4 py-2 text-slate-600 rounded-sm border border-slate-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
      )}
    </div>
  );
};

export default ProductCreateForm;
