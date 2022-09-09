import { SyntheticEvent, useEffect, useState } from "react";
import { Sale } from "../../@types/Sale";
import { debug } from "../../consts/debug";
import { apiUri } from "../../consts/uri";
import { Plus, X } from "phosphor-react";
import Header from "../Header";
import { IItem } from "../../@types/Item";
import { useNavigate } from "react-router-dom";

const SaleCreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingBranch, setIsLoadingBranch] = useState<boolean>(true);
  const [saleData, setSaleData] = useState<Sale | null>();
  const [branchList, setBranchList] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [mostrarPercentual, setMostrarPercentual] = useState<boolean>(true);
  const [mostrarAVista, setMostrarAVista] = useState<boolean>(true);
  const [activeSelect, setActiveSelect] = useState<string>("1");
  const [pageSelect, setPageSelect] = useState<string>("A4");
  const [branchsSelected, setBranchsSelected] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const callBranchApi = async () => {
      const response = await fetch(`${apiUri}/branchs`);
      const branchs = await response.json();
      setBranchList(branchs);
      setIsLoadingBranch(false);
      setIsLoading(false);
      debug && console.log(branchs);
    };
    callBranchApi();
  }, []);

  const handleAddBranch = (id: number) => {
    debug && console.log(id);
    let temp = branchsSelected;
    if (temp!.includes(id)) {
      let temp2: number[] = [];
      temp?.map((verificacao) =>
        verificacao !== id ? temp2.push(verificacao) : null
      );
      setBranchsSelected(temp2);
    } else {
      let temp2: number[] = [id];
      temp.map((verificacao) => {
        temp2.push(verificacao);
      });
      setBranchsSelected(temp2);
    }
  };

  const getSelect = (name: string) => {
    let select = document.getElementsByName(name);
    // @ts-ignore
    return select[0].options[select[0].options.selectedIndex].value;
  };

  const handleSaveButtonClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(`${apiUri}/sales/create`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        start_date: startDate,
        end_date: endDate,
        branch_list: branchsSelected,
        products_list: [],
        layout: {
          layout_id: getSelect("layout"),
          mostrar_perc: mostrarPercentual,
          mostrar_avista: mostrarAVista,
          page: getSelect("page"),
        },
      }),
    });
    const sale = await response.json();
    debug && console.log(response.status, sale);
    if (response.status === 200)
      window.location.replace(`/admin/promocoes/editar/${sale._id}`);
  };
  return (
    <>
      <Header isAdmin />
      <div className="w-full mb-5 flex flex-col justify-center items-center">
        {!isLoading ? (
          <>
            <form className="bg-white m-5 p-5 flex items-start flex-col gap-4 rounded-md shadow-sm max-w-[600px]">
              <fieldset className="flex flex-col items-start gap-1 min-w-full ">
                <label
                  className="font-medium text-lg text-slate-600"
                  htmlFor="title"
                >
                  Nome da campanha:
                </label>
                <input
                  className="min-w-full py-2 px-4 bg-slate-100 rounded-md h-10"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
              </fieldset>
              <fieldset className="flex flex-col items-start gap-1 min-w-full ">
                <label
                  className="font-medium text-lg text-slate-600"
                  htmlFor="start"
                >
                  Inicio:
                </label>

                <input
                  className="min-w-full py-2 px-4 bg-slate-100 rounded-md h-10"
                  type="date"
                  id="start"
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                />
              </fieldset>
              <fieldset className="flex flex-col items-start gap-1 min-w-full ">
                <label
                  className="font-medium text-lg text-slate-600"
                  htmlFor="end"
                >
                  Término:
                </label>

                <input
                  className="min-w-full py-2 px-4 bg-slate-100 rounded-md h-10"
                  type="date"
                  id="end"
                  value={endDate}
                  onChange={(e: any) => setEndDate(e.target.value)}
                />
              </fieldset>
              <hr className="h-1 text-slate-300 w-full" />
              <fieldset>
                <legend className="font-medium text-lg text-slate-600 mb-2">
                  Filiais:
                </legend>
                <ul className="flex flex-row flex-wrap gap-2 mb-2">
                  {branchList &&
                    branchList.length > 0 &&
                    branchList.map(
                      (branch: any, index: number, element: HTMLLIElement) => (
                        <li
                          className={
                            branchsSelected?.includes(branch._id)
                              ? `bg-green-700 text-white px-2 border-none rounded-sm cursor-pointer`
                              : `bg-slate-100 text-white px-2 border-none rounded-sm cursor-pointer hover:bg-green-900`
                          }
                          key={index}
                          onClick={(e) => handleAddBranch(branch._id)}
                        >
                          {branch._id < 10
                            ? `P0${branch._id}`
                            : `P${branch._id}`}
                        </li>
                      )
                    )}
                </ul>
              </fieldset>
              <hr className="h-1 text-slate-300 w-full" />
              <fieldset className="flex flex-col items-start gap-2 min-w-full ">
                <legend className="font-medium text-lg text-slate-600 mb-2">
                  Modelo de Layout:
                </legend>
                <select
                  name="layout"
                  id="layout"
                  className="w-full py-2 px-4 h-10 bg-slate-100 rounded-md"
                  value={activeSelect}
                  onChange={(e: any) => setActiveSelect(e.target.value)}
                >
                  <option value="1">Layout 1</option>
                  <option value="2">Layout 2</option>
                  <option value="3">Layout 3</option>
                  <option value="4">Layout 4</option>
                  <option value="6">Layout 6</option>
                  <option value="7">Layout 7</option>
                </select>
                <legend className="font-medium text-lg text-slate-600 mb-2">
                  Tamanho da página:
                </legend>
                <select
                  name="page"
                  id="page"
                  className="w-full py-2 px-4 h-10 bg-slate-100 rounded-md"
                  value={pageSelect}
                  onChange={(e: any) => setPageSelect(e.target.value)}
                >
                  <option value="A4">A4</option>
                  <option value="A6">A6</option>
                </select>
                <div className="flex items-center justify-between w-full my-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="percentual"
                      id="percentual"
                      className="w-4 h-4 bg-slate-100 rounded-md"
                      checked={mostrarPercentual}
                      onChange={() => setMostrarPercentual(!mostrarPercentual)}
                    />
                    <label
                      htmlFor="percentual"
                      className="text-slate-600 font-medium"
                    >
                      Mostrar percentual
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="avista"
                      id="avista"
                      className="w-4 h-4 bg-slate-100 rounded-md"
                      checked={mostrarAVista}
                      onChange={() => setMostrarAVista(!mostrarAVista)}
                    />
                    <label
                      htmlFor="avista"
                      className="text-slate-600 font-medium"
                    >
                      Mostrar à vista
                    </label>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className="flex flex-row-reverse gap-6 rounded-md mb-5">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded-sm"
                onClick={(e) => handleSaveButtonClick(e)}
              >
                Salvar
              </button>
              <button
                onClick={(e) => navigate("/admin/promocoes", { replace: true })}
                className="border border-slate-500 text-slate-500 px-4 py-2 rounded-sm"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
        )}
      </div>
    </>
  );
};

export default SaleCreateForm;
