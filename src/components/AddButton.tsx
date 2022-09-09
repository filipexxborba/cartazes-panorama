import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";

interface IButton {
  destinate: string;
}
const AddButton = ({ destinate }: IButton) => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed bottom-8 right-8 bg-emerald-800 w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
      onClick={() => navigate(`${destinate}`)}
    >
      <Plus color="white" weight="bold" size={24} />
    </button>
  );
};

export default AddButton;
