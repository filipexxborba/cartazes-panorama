import { useParams } from "react-router-dom";
import PrintModel7 from "../components/PrintModels/PrintModel7";

const Layout7Page = () => {
  const {
    title,
    subtitle,
    valuePreviously,
    value,
    ref_int,
    unidade_venda,
    parc,
    validity,
    mostrar_avista,
    mostrar_percentual,
    startDate,
    endDate,
  } = useParams();
  return (
    <>
      <PrintModel7
        title={title!}
        subtitle={subtitle}
        valuePreviously={valuePreviously}
        value={value}
        ref_int={parseInt(ref_int!)}
        unidade_venda={unidade_venda}
        quant_parc={parseInt(parc!)}
        validate={validity}
        isEditing={false}
        mostrar_avista={mostrar_avista === "true" ? true : false}
        mostrar_percentual={mostrar_percentual === "true" ? true : false}
        startDate={startDate ? startDate : new Date().toDateString()}
        endDate={endDate ? endDate : new Date().toDateString()}
      />
    </>
  );
};

export default Layout7Page;
