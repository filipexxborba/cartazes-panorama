import { SyntheticEvent, useEffect, useState } from "react";
import { debug } from "../consts/debug";
import { apiUri } from "../consts/uri";
import Logo from "../assets/logo-operacoes.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filial, setFilial] = useState<string>("1");
  const [branchs, setBranchs] = useState<
    { name: string; _id: number }[] | null
  >(null);
  const navigate = useNavigate();
  useEffect(() => {
    const callBranchList = async () => {
      const response = await fetch(`${apiUri}/branchs`);
      const branchs = await response.json();
      debug && console.log(branchs);
      setBranchs(branchs);
      setIsLoading(false);
      const cacheFilial = localStorage.getItem("filial");
      if (cacheFilial) setFilial(cacheFilial);
    };
    callBranchList();
  }, []);

  const getSelect = (name: string) => {
    let select = document.getElementsByName(name);
    // @ts-ignore
    return select[0].options[select[0].options.selectedIndex].value;
  };

  const handleClickButton = (event: SyntheticEvent) => {
    event.preventDefault();
    debug && console.log(getSelect("filial"));
    navigate(`/impressoes/${getSelect("filial")}`);
    localStorage.setItem("filial", getSelect("filial"));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <img src={Logo} className="w-32 h-32 -mt-32" />
        <form className="bg-white p-5 rounded-md shadow-sm flex flex-col items-start">
          <label
            htmlFor="filial"
            className="font-medium text-lg text-slate-600"
          >
            Selecione sua filial:
          </label>
          {!isLoading && branchs ? (
            <select
              name="filial"
              id="filial"
              className=" py-2 px-4 bg-slate-100 rounded-md h-10 mt-2 text-slate-600"
              value={filial}
              onChange={(e) => setFilial(e.target.value)}
            >
              {branchs.map(
                (branch: { name: string; _id: number }, index: number) => (
                  <option key={index} value={branch._id}>
                    {branch.name}
                  </option>
                )
              )}
            </select>
          ) : (
            <span className="block w-12 h-12 border-8 border-slate-200 border-t-emerald-700 rounded-full animate-spin mx-auto my-5"></span>
          )}
          <button
            className="bg-emerald-600 text-white font-medium px-4 py-2 mt-4 rounded-sm w-full"
            onClick={handleClickButton}
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
