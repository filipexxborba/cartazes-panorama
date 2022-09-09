export interface Sale {
  _id: string;
  title: string;
  start_date: Date;
  end_date: Date;
  product_list: string[];
  products_list?: string[];
  branch_list: number[];
  isValidity?: boolean;
  layout?: any[];
}
