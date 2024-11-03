import iconEdit from "@/assets/icons/icon-edit.svg";
import iconHelp from "@/assets/icons/icon-help.svg";
import iconHome from "@/assets/icons/icon-home.svg";
import iconPackage from "@/assets/icons/icon-package.svg";
import iconPlus from "@/assets/icons/icon-plus.svg";
import iconSettings from "@/assets/icons/icon-settings.svg";
import iconUpRight from "@/assets/icons/icon-up-right.svg";

import Image from "next/image";

const NavItem: React.FC<{
  text: string;
  icon: string;
  active?: boolean;
}> = ({ text, icon, active }) => {
  return (
    <a
      href="#"
      className={`flex items-center text-gray-700 rounded-2xl px-4 py-2 ${
        active ? "bg-white" : "bg-transparent"
      }`}
    >
      <Image alt="" src={icon} />
      <label className="ml-4">{text}</label>
    </a>
  );
};

const ButtonIconLight: React.FC<{ text: string; icon: string }> = ({
  text,
  icon,
}) => {
  return (
    <button className="flex items-center justify-between px-4 py-2 bg-indigo-100 text-indigo-700 text-xs rounded-lg shadow-sm hover:shadow-md border border-indigo-300 hover:bg-indigo-200 transition ease-in-out w-full">
      {text}

      <Image alt="button" src={icon} className="ml-2" />
    </button>
  );
};

const ButtonIconDark: React.FC<{ text: string; icon: string }> = ({
  text,
  icon,
}) => {
  return (
    <button className="flex items-center justify-between px-4 py-2 bg-indigo-400 text-white text-xs rounded-lg shadow-sm hover:shadow-md border border-indigo-400 hover:bg-indigo-500 transition ease-in-out w-full">
      {text}

      <Image alt="button" src={icon} className="ml-2" />
    </button>
  );
};

const NavigationBar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-50 to-indigo-200 p-4 flex flex-col m-4 rounded-2xl h-fit">
      <h1 className="text-3xl font-light text-gray-700 mb-20">Creativeans</h1>
      <div className="mb-12">
        <div className="text-xs mb-4 mx-4">Overview</div>
        <nav className="flex flex-col space-y-1">
          <NavItem text="Dashboard" icon={iconHome} active />
          <NavItem text="Cracker" icon={iconPackage} />
          <NavItem text="Cracker" icon={iconEdit} />
        </nav>
      </div>

      <div className="mb-20">
        <div className="text-xs mb-4 mx-4">Others</div>
        <nav className="flex flex-col space-y-1">
          <NavItem text="Settings" icon={iconSettings} />
          <NavItem text="Support" icon={iconHelp} />
        </nav>
      </div>

      <div className="mb-4">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-black font-medium text-xl">
            Level up your cracker to the next level
          </p>
          <p className="text-sm mt-8">$39/month</p>
          <div className="my-2">
            <ButtonIconLight text="Add Cracker" icon={iconPlus} />
          </div>
          <div>
            <ButtonIconDark text="Upgrade to Enterprise" icon={iconUpRight} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NavigationBar;
