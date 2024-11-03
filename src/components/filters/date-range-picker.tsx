import React, { useState } from "react";
import Image from "next/image";

import iconCalendar from "@/assets/icons/icon-calendar.svg";
import iconDropdown from "@/assets/icons/icon-arrow-dropdown.svg";
import iconRange from "@/assets/icons/icon-range.svg";

type MonthObject = { month: string };

const months: MonthObject[] = [
  { month: "November 2023" },
  { month: "December 2023" },
  { month: "January 2024" },
  { month: "February 2024" },
  { month: "March 2024" },
  { month: "April 2024" },
  { month: "May 2024" },
  { month: "June 2024" },
  { month: "July 2024" },
  { month: "August 2024" },
  { month: "September 2024" },
  { month: "October 2024" },
];

const DateSelector: React.FC<{
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: () => Array<MonthObject>;
}> = ({ value, onChange, options }) => {
  return (
    <div className="flex items-center mx-1 bg-gray-50 px-2 rounded-md">
      <select
        className="bg-transparent border-none text-sm focus:outline-none appearance-none"
        value={value}
        onChange={onChange}
      >
        {options().map((m) => (
          <option key={m.month} value={m.month}>
            {m.month}
          </option>
        ))}
      </select>
      <Image alt="arrow" src={iconDropdown} className="ml-2" />
    </div>
  );
};

const DateRangeFilter: React.FC<{
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}> = ({ startDate, endDate, setStartDate, setEndDate }) => {
  // Function to filter end options based on selected start
  const getFilteredEndOptions = () => {
    if (!startDate) return months;
    const startIndex = months.findIndex((m) => m.month === startDate);
    return months.slice(startIndex + 1);
  };

  // Function to filter start options based on selected end
  const getFilteredStartOptions = () => {
    if (!endDate) return months;
    const endIndex = months.findIndex((m) => m.month === endDate);
    return months.slice(0, endIndex);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="border border-gray-200 float-end flex px-4 py-1 rounded-xl">
      <span className="text-gray-500">Range:</span>
      <Image alt="calendar" src={iconCalendar} className="mx-2" />

      <DateSelector
        value={startDate}
        onChange={handleStartDateChange}
        options={getFilteredStartOptions}
      />

      <label className="mx-2">
        <Image alt="range" src={iconRange} width={16} className="mt-3" />
      </label>

      <DateSelector
        value={endDate}
        onChange={handleEndDateChange}
        options={getFilteredEndOptions}
      />
    </div>
  );
};

export default DateRangeFilter;
