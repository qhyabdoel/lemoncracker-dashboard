import Image from "next/image";
import iconTrendingUp from "@/assets/icons/icon-trending-up.svg";

const TopCardsItem: React.FC<{
  active?: boolean;
  title: string;
  amount: string | number;
  icon: string;
  handleClick: any;
}> = ({ active, title, amount, icon, handleClick }) => {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer ${
        active ? "bg-gradient-to-b from-indigo-200 to-gray-50" : "bg-gray-100"
      }`}
      onClick={handleClick}
    >
      <div className="text-sm">{title}</div>
      <div className="text-xl mt-2 text-black">{amount}</div>

      <div className="flex items-center text-sm mt-2">
        <Image alt="trending" src={iconTrendingUp} className="mr-2" />
        <span>+7.2% vs last year</span>
        <div className="flex-auto">
          <Image alt="icon" src={icon} className="float-end" />
        </div>
      </div>
    </div>
  );
};

export default TopCardsItem;
