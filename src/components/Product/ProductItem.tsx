import { Package, ArrowRight } from "phosphor-react";

interface posters {
  id: string;
  value?: string;
  valuePreviously?: string;
  unidadeVenda?: string;
  stock?: string;
  validate?: string;
  parc?: number;
}
export interface IProduct {
  _id: string;
  product_title: string;
  product_subtitle: string;
  ref_int: number;
  posters_layouts?: posters[];
}

const ProductItem = ({
  _id,
  product_title,
  product_subtitle,
  ref_int,
}: IProduct) => {
  return (
    <li className="bg-white rounded-md shadow-sm p-5 flex items-center justify-between gap-1 max-w-full border-l-2 border-l-emerald-600">
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Package size={24} weight="duotone" className="" />
          <h2 className="text-lg">{product_title}</h2>
        </div>
        <h3 className="text-slate-500 text-md w-[98%] leading-5 ">
          {product_subtitle}
        </h3>
        <h4 className="flex items-center text-slate-500 text-md">
          Ref. Interna: {ref_int}
        </h4>
      </div>
      <ArrowRight size={18} weight="duotone" className="text-slate-600" />
    </li>
  );
};

export default ProductItem;
