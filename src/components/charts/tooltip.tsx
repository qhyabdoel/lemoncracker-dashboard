const ChartTooltip: React.FC<{
  lineData: number | string;
  monthStr: string;
}> = ({ lineData, monthStr }) => {
  return (
    <div className="">
      <div className="text-sm font-semibold flex">
        <div className="mt-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_471)">
              <path
                d="M15.3333 4L8.99999 10.3333L5.66666 7L0.666656 12M15.3333 4H11.3333M15.3333 4L15.3333 8"
                stroke="#6F66FF"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_471">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="">
          <label className="ml-2">{lineData}</label>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">{monthStr}</p>
    </div>
  );
};

export default ChartTooltip;
