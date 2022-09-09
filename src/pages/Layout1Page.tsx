import React from "react";
import { useParams } from "react-router-dom";
import PrintModel1 from "../components/PrintModels/PrintModel1";

const Layout1Page = () => {
  const {
    title,
    subtitle,
    valuePreviously,
    value,
    ref_int,
    unidade_venda,
    mostrar_avista,
    mostrar_percentual,
    startDate,
    endDate,
  } = useParams();
  return (
    <>
      <PrintModel1
        title={title!}
        subtitle={subtitle}
        valuePreviously={valuePreviously}
        value={value!}
        ref_int={parseInt(ref_int!)}
        unidade_venda={unidade_venda}
        isEditing={false}
        mostrar_avista={mostrar_avista === "true" ? true : false}
        mostrar_percentual={mostrar_percentual === "true" ? true : false}
        startDate={startDate ? startDate : new Date().toDateString()}
        endDate={endDate ? endDate : new Date().toDateString()}
      />
    </>
  );
};

export default Layout1Page;
