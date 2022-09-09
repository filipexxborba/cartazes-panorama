import {
  DotsThreeVertical,
  CalendarBlank,
  CalendarPlus,
  Package,
  Plus,
} from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IHeader {
  isAdmin: boolean;
}

const Header = ({ isAdmin }: IHeader) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <header className="bg-emerald-700 p-8 shadow-lg shadow-emerald-50 print:hidden">
      <div className="container mx-auto flex items-center justify-between relative">
        <h2 className="text-6xl font-medium font-['Creighton'] text-white">
          Cartazes PHC
        </h2>
        {isAdmin && (
          <DotsThreeVertical
            size={32}
            className="text-white cursor-pointer"
            weight="bold"
            onClick={() => setShowMenu(!showMenu)}
          />
        )}
        {showMenu && isAdmin && (
          <div className="absolute right-0 bg-emerald-800 text-white p-4 mt-72 rounded-md shadow-lg arrow-up flex flex-col gap-3 items-start selection:bg-none z-[999]">
            <Link
              to={`/admin/promocoes/criar`}
              className="flex items-center gap-2 p-1 cursor-pointer"
            >
              <CalendarPlus size={24} />
              <p className="font-medium">Cadastrar nova campanha</p>
            </Link>
            <hr className="h-1 w-full" />
            <Link
              to={`/admin/promocoes`}
              className="flex items-center gap-2 p-1 cursor-pointer"
            >
              <CalendarBlank size={24} />
              <p className="font-medium">Listar todas campanhas</p>
            </Link>
            <hr className="h-1 w-full" />
            <Link
              to={`/admin/produtos/criar`}
              className="flex items-center gap-2  p-1 cursor-pointer"
            >
              <Plus size={24} />
              <p className="font-medium">Cadastrar novo produto</p>
            </Link>
            <hr className="h-1 w-full" />
            <Link
              to={`/admin/produtos`}
              className="flex items-center gap-2  p-1 cursor-pointer"
            >
              <Package size={24} />
              <p className="font-medium">Listar todos produtos</p>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
