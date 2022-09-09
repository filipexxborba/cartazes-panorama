import { SyntheticEvent, useEffect, useState } from "react";
import { IItem } from "../../@types/Item";
import { imagesUri } from "../../consts/images";
import { apiUri } from "../../consts/uri";

const Layout4 = ({ title, subtitle, ref_int, _id, isEditing }: IItem) => {
  const [valuePreviously, setValuePreviously] = useState("");
  const [value, setValue] = useState("");
  const [unidadeVenda, setUnidadeVenda] = useState("");
  const [parc, setParc] = useState("");
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const handleSaveButton = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoadingSave(true);
    fetch(`${apiUri}/products/edit/layout`, {
      headers: { "Content-type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({
        id: _id,
        posterLayout: {
          id: "4",
          valuePreviously: valuePreviously,
          value: value,
          unidadeVenda: unidadeVenda,
          parc: parc,
        },
      }),
    });
    setTimeout(() => {
      setIsLoadingSave(false);
    }, 1000);
  };

  useEffect(() => {
    if (isEditing) {
      const callLayoutApi = async () => {
        const response = await fetch(`${apiUri}/products/${_id}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const infos = await response.json();
        let check = infos.posters_layouts.findIndex(
          (poster: { id: string }) => poster.id === "4"
        );
        if (check !== -1) {
          setValuePreviously(infos.posters_layouts[check].valuePreviously);
          setValue(infos.posters_layouts[check].value);
          setUnidadeVenda(infos.posters_layouts[check].unidadeVenda);
          setParc(infos.posters_layouts[check].parc);
        }
      };
      callLayoutApi();
    }
  }, []);
  return (
    <fieldset>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <img src={imagesUri[3]} className="max-h-[500px]" />
        <div className="my-3 flex flex-col gap-2">
          <div className="grid grid-cols-2 items-center gap-2">
            <label className="text-md font-medium text-slate-500">
              Valor De:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full p-2 px-4"
              value={valuePreviously}
              onChange={(e: any) => setValuePreviously(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <label className="text-md font-medium text-slate-500">
              Valor Por:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full p-2 px-4"
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <label className="text-md font-medium text-slate-500">
              Uni. de venda:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full p-2 px-4"
              value={unidadeVenda}
              onChange={(e: any) => setUnidadeVenda(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <label className="text-md font-medium text-slate-500">
              Quantidade de parcelas:
            </label>
            <input
              type="number"
              className="bg-slate-50 w-full p-2 px-4"
              value={parc}
              onChange={(e: any) => setParc(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 mt-3 flex-row-reverse">
            {isEditing && (
              <button
                className="bg-slate-500 px-4 py-2 text-white w-20 h-10 flex items-center justify-center"
                onClick={(e) => handleSaveButton(e)}
                disabled={isLoadingSave}
              >
                {isLoadingSave ? (
                  <span className="block w-4 h-4 border-2 border-white border-t-slate-700 rounded-full animate-spin"></span>
                ) : (
                  "Salvar"
                )}
              </button>
            )}
            <a
              target="_blank"
              href={`/admin/layout/4/${title}&${subtitle}&${valuePreviously}&${value}&${ref_int}&${unidadeVenda}&${parc}&true&true&${new Date().toDateString()}&${new Date().toDateString()}`}
              className="px-4 py-2 text-slate-500 bg-white border border-slate-500"
            >
              Visualizar
            </a>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default Layout4;
