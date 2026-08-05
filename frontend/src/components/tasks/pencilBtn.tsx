import { Pencil } from "lucide-react";
import type { FC } from "react";

export const PencilBtn: FC = () => {
  return (
    <button type="button" className="flex text-gray-600 items-end">
      <Pencil size={18} />
    </button>
  );
};
