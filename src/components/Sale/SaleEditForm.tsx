import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sale } from "../../@types/Sale";
import { debug } from "../../consts/debug";
import { apiUri } from "../../consts/uri";
import { Plus, X } from "phosphor-react";
import Header from "../Header";
import { IItem } from "../../@types/Item";

const SaleEditForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allProducts, setAllProducts] = useState<number[]>();
  const [errorListProducts, setErrorListProducts] = useState<number[]>();
  const [isLoadingBranch, setIsLoadingBranch] = useState<boolean>(true);
  const [saleData, setSaleData] = useState<Sale | null>();
  const [branchList, setBranchList] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [productsInput, setProductsInput] = useState<string>("");
  const [mostrarPercentual, setMostrarPercentual] = useState<boolean>(true);
  const [mostrarAVista, setMostrarAVista] = useState<boolean>(true);
  const [productList, setProductList] = useState<number[]>();
  const [activeSelect, setActiveSelect] = useState<string>("1");
  const [pageSelect, setPageSelect] = useState<string>("A4");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const callSaleApi = async () => {
      const response = await fetch(`${apiUri}/sales/${id}`);
      const sale = await response.json();
      setIsLoading(false);
      setSaleData(sale);
      setTitle(sale.title);
      setStartDate(new Date(sale.start_date).toISOString().split("T")[0]);
      setEndDate(new Date(sale.end_date).toISOString().split("T")[0]);
      setProductList(sale.products_list);
      setMostrarPercentual(sale.layout[0].mostrar_perc);
      setMostrarAVista(sale.layout[0].mostrar_avista);
      setActiveSelect(sale.layout[0].layout_id);
      setPageSelect(sale.layout[0].page ? sale.layout[0].page : "A4");
      debug && console.log(sale);
    };
    const callBranchApi = async () => {
      const response = await fetch(`${apiUri}/branchs`);
      const branchs = await response.json();
      setBranchList(branchs);
      setIsLoadingBranch(false);
      debug && console.log(branchs);
    };
    const allProductsApi = async () => {
      const response = await fetch(`${apiUri}/products`);
      const products = await response.json();
      debug && console.log(products);

      let temp: number[] = [];
      products.map((product: IItem) => {
        temp.push(product.ref_int!);
      });
      setAllProducts(temp);
    };
    callSaleApi();
    callBranchApi();
    allProductsApi();
  }, [id]);

  const handleBranchClick = async (branchIndex: number) => {
    const response = await fetch(`${apiUri}/sales/edit/branch`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
        branchID: branchIndex,
      }),
    });
    const sale = await response.json();
    debug && console.log(sale);
    window.location.reload();
  };

  const handleAddButtonClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const inputList = productsInput.replaceAll(" ", "").split(",");
    let erros: any = [];
    console.log(inputList);
    inputList.map((verificar) => {
      allProducts!.includes(parseInt(verificar)) ? null : erros.push(verificar);
    });

    console.log(erros);
    setErrorListProducts(erros);
    if (inputList[0] !== "" && erros.length === 0) {
      const response = await fetch(`${apiUri}/sales/edit/products`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          _id: id,
          products_list: inputList,
        }),
      });
      const sale = await response.json();
      debug && console.log(inputList, sale);
      if (response.status === 200) window.location.reload();
    }
  };

  const handleDeleteProduct = async (index: number) => {
    const response = await fetch(`${apiUri}/sales/edit/products`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
        productDelete: productList![index],
      }),
    });
    if (response.status === 200) window.location.reload();
  };

  const getSelect = (name: string) => {
    let select = document.getElementsByName(name);
    // @ts-ignore
    return select[0].options[select[0].options.selectedIndex].value;
  };

  const handleSaveButtonClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(`${apiUri}/sales/edit`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
        title: title,
        start_date: startDate,
        end_date: endDate,
        branchList: branchList,
        products_list: productList,
        layout: {
          layout_id: getSelect("layout"),
          mostrar_perc: mostrarPercentual,
          mostrar_avista: mostrarAVista,
          page: getSelect("page"),
        },
      }),
    });
    debug && console.log(response.status);
    if (response.status === 200) window.location.reload();
  };

  const handleDeleteButton = async (e: SyntheticEvent) => {
    e.preventDefault;
    const response = await fetch(`${apiUri}/sales/delete`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    });
    if (response.status === 200)
      navigate("/admin/promocoes", { replace: true });
  };
  return (
    <>
      <Header isAdmin />
      <div className="w-full mb-5 flex flex-col items-center justify-center">
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
                    branchList.map((branch: any, index: number) => (
                      <li
                        className={
                          saleData?.branch_list.includes(branch._id)
                            ? `bg-green-700 text-white px-2 border-none rounded-sm cursor-pointer`
                            : `bg-slate-100 text-white px-2 border-none rounded-sm cursor-pointer hover:bg-green-900`
                        }
                        key={index}
                        onClick={(e) => handleBranchClick(branch._id)}
                      >
                        {branch._id < 10 ? `P0${branch._id}` : `P${branch._id}`}
                      </li>
                    ))}
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
              <hr className="h-1 text-slate-300 w-full" />
              <fieldset className="flex flex-col items-start gap-1 min-w-full ">
                <legend className="font-medium text-lg text-slate-600 mb-2">
                  Produtos:
                </legend>
                <div className="w-full flex items-center gap-4">
                  <input
                    type="text"
                    className="w-full py-2 px-4 bg-slate-100 rounded-md relative"
                    id="products"
                    value={productsInput}
                    onChange={(e: any) => setProductsInput(e.target.value)}
                    placeholder="Digite a lista de produtos separados por vírgula"
                  />
                  <button
                    className="bg-green-700 p-2 rounded-md text-white"
                    onClick={(e) => handleAddButtonClick(e)}
                  >
                    <Plus weight="bold" className="text-white" size={18} />
                  </button>
                </div>
                {errorListProducts && errorListProducts.length > 0 && (
                  <div className="my-2 mb-0 text-red-400">
                    <h3>Produtos sem cadastro:</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {errorListProducts.map((product, index) => (
                        <p key={index}>{product}</p>
                      ))}
                    </div>
                  </div>
                )}
                <ul className="w-full flex items-center gap-2 flex-wrap my-4">
                  {productList && productList.length > 0 ? (
                    productList.map((product, index) => (
                      <li
                        className="bg-slate-100 px-2 rounded-md text-slate-500 flex items-center gap-2"
                        key={index}
                      >
                        <X
                          weight="bold"
                          size={10}
                          onClick={(e) => {
                            handleDeleteProduct(index);
                          }}
                        />
                        {product}
                      </li>
                    ))
                  ) : (
                    <p>Nenhum produto cadastrado</p>
                  )}
                </ul>
              </fieldset>
            </form>
            <div className=" mx-5 flex flex-row-reverse items-center gap-6 rounded-md mb-5">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded-sm"
                onClick={(e) => handleSaveButtonClick(e)}
              >
                Salvar
              </button>
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-sm"
                onClick={(e) => handleDeleteButton(e)}
              >
                Deletar
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

export default SaleEditForm;
