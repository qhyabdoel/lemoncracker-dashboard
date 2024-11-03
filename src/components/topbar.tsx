import CardCurrentDate from "./cards/card-current-date";
import Image from "next/image";

import cardPlan from "@/assets/images/card-plan.svg";
import cardUser from "@/assets/images/card-user.svg";
import iconAlert from "@/assets/icons/icon-alert.svg";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl text-indigo-600">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <CardCurrentDate />
        <span className="relative">
          <Image alt="icon" src={iconAlert} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></div>
        </span>

        <Image alt="user" src={cardUser} />
        <Image alt="plan" src={cardPlan} />
      </div>
    </div>
  );
};

export default TopBar;
