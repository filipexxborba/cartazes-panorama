import { useParams } from "react-router-dom";
import PrintModel6 from "../components/PrintModels/PrintModel6";

const LayoutPage6 = () => {
  const {
    title,
    subtitle,
    value,
    ref_int,
    unidade_venda,
    mostrar_avista,
    mostrar_percentual,
    endDate,
    startDate,
  } = useParams();
  return (
    <>
      <PrintModel6
        title={title!}
        subtitle={subtitle}
        value={value}
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

export default LayoutPage6;
