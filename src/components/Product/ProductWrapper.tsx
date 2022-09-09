import { SyntheticEvent, useEffect, useState } from "react";
import { debug } from "../../consts/debug";
import { apiUri } from "../../consts/uri";
import ProductItem, { IProduct } from "./ProductItem";
import { ClipboardText, MagnifyingGlass } from "phosphor-react";
import { Link } from "react-router-dom";

const ProductWrapper = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<IProduct[] | null>();
  const [filter, setFilter] = useState<string>("");
  const [filteredProductsData, setFilteredProductsData] = useState<
    IProduct[] | null
  >();
  useEffect(() => {
    const callProductsApi = async () => {
      const response = await fetch(`${apiUri}/products`);
      const products = await response.json();
      setProductsData(products);
      setFilteredProductsData(products);
      debug && console.log(products);
      setIsLoading(false);
    };
    callProductsApi();
  }, []);

  const handleChangeFilter = (e: any) => {
    const temp = productsData?.filter((product) =>
      product.product_title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredProductsData(temp);
  };
  return (
    <div className="max-w-[600px] flex justify-center flex-col mx-auto">
      <div className="relative flex items-center gap-2  m-5 text-emerald-900">
        <input
          className="w-full py-2 px-4 bg-white rounded-md indent-5 outline-emerald-900"
          type="text"
          name="filter"
          id="filter"
          placeholder="Digite o nome do produto para pesquisar"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          onKeyUp={handleChangeFilter}
        />
        <MagnifyingGlass className="absolute left-3" weight="bold" />
      </div>
      <div className="flex items-center gap-2  m-5 border-b border-b-slate-200 pb-3 text-emerald-900">
        <ClipboardText size={24} weight="bold" />
        <h2 className=" font-bold text-xl">Produtos cadastrados:</h2>
      </div>
      <ul className="flex flex-col gap-4 max-w-full my-5 mx-4">
        {!isLoading ? (
          productsData && productsData.length > 0 ? (
            filteredProductsData!
              .sort((a, b) => {
                if (a.product_title > b.product_title) return 1;
                else return -1;
              })
              .map((product) => (
                <Link
                  to={`/admin/produtos/editar/${product._id}`}
                  key={product._id}
                >
                  <ProductItem
                    _id={product._id}
                    product_title={product.product_title}
                    product_subtitle={product.product_subtitle}
                    ref_int={product.ref_int}
                  />
                </Link>
              ))
          ) : (
            <li>Nenhum produto cadastrado</li>
          )
        ) : (
          <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
        )}
      </ul>
    </div>
  );
};

export default ProductWrapper;
