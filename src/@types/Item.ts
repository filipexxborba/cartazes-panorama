export interface IItem {
  title: string;
  subtitle?: string;
  quant_parc?: number | null;
  value?: string;
  valuePreviously?: string;
  unidade_venda?: string;
  ref_int?: number;
  validate?: string;
  stock?: string;
  _id?: string;
  isEditing: boolean;
  mostrar_avista: boolean;
  mostrar_percentual: boolean;
  startDate?: string;
  endDate?: string;
}
