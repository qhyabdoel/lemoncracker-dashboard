import React from "react";

const CardCurrentDate = () => {
  // Get current date
  const currentDate = new Date();

  // Format to "Day, Date Month"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <p className="bg-gray-100 px-4 py-2 rounded-xl text-gray-600 text-xs">
      {formattedDate}
    </p>
  );
};

export default CardCurrentDate;
