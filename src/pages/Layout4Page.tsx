import { useParams } from "react-router-dom";
import PrintModel3 from "../components/PrintModels/PrintModel3";
import PrintModel4 from "../components/PrintModels/PrintModel4";

const Layout4Page = () => {
  const {
    title,
    subtitle,
    valuePreviously,
    value,
    ref_int,
    unidade_venda,
    parc,
    mostrar_avista,
    mostrar_percentual,
    startDate,
    endDate,
  } = useParams();
  return (
    <>
      <PrintModel4
        title={title!}
        subtitle={subtitle}
        valuePreviously={valuePreviously}
        value={value}
        ref_int={parseInt(ref_int!)}
        unidade_venda={unidade_venda}
        quant_parc={parseInt(parc!)}
        isEditing={false}
        mostrar_avista={mostrar_avista === "true" ? true : false}
        mostrar_percentual={mostrar_percentual === "true" ? true : false}
        startDate={startDate ? startDate : new Date().toDateString()}
        endDate={endDate ? endDate : new Date().toDateString()}
      />
    </>
  );
};

export default Layout4Page;
