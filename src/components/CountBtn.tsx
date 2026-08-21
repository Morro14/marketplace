import minusIcon from "@/src/assets/minus-medium.svg";
import plusIcon from "@/src/assets/plus-medium.svg";
import Image from "next/image";

type CountButtonTypes = "plus" | "minus";
export default function CountBtn({
  img,
  status,
  callback,
  params,
}: {
  img: CountButtonTypes;
  status: "active" | "inactive";
  callback: () => void;
  params?: React.HTMLAttributes<HTMLButtonElement>;
}) {
  const images = {
    plus: plusIcon,
    minus: minusIcon,
  };
  const bg = {
    active: "bg-accent hover:opacity-80",
    inactive: "bg-gray-light opacity-50",
  };
  return (
    <button {...params} onClick={callback} className={`${bg[status]} h-7 w-7`}>
      <Image
        className="m-auto"
        src={images[img]}
        alt={`count-icon-${img}`}
      ></Image>
    </button>
  );
}
