import { EChartsOption } from "echarts-for-react";

export const formatDate = (dateDate?: string) => {
  if (!dateDate) return "-";
  const monthMap: { [key: string]: string } = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  // Split the input string into month and year
  const [month, year] = dateDate.split(" ");

  // Get the abbreviated month
  const abbreviatedMonth = monthMap[month];

  // Return the formatted date string
  return `${abbreviatedMonth}/${year}`;
};

export const formatValue = (value?: number) => {
  if (!value) return "-";
  if (value >= 1000) {
    return value / 1000 + "K";
  }
  return value;
};

export const formatIntTimes = (seconds?: number) => {
  if (!seconds) return "-";
  const minutes = Math.floor(seconds / 60); // Get the number of full minutes
  const remainingSeconds = seconds % 60; // Get the remaining seconds

  return `${minutes} min ${remainingSeconds} seconds`;
};

export const generateChartOpt = (chart: EChartsOption, params: any) => {
  const option = chart.getOption();
  const series = option.series as echarts.SeriesOption[];

  // clear daya
  if (series[1].type === "bar") {
    series[1].data?.forEach((item: any) => {
      if (item?.itemStyle) delete item.itemStyle;
    });
  }

  // Highlight the clicked item if it’s a bar or line series
  const clickedSeries = series[1];

  if (clickedSeries.data) {
    clickedSeries.data[params.dataIndex] = {
      value:
        params.seriesIndex === 0
          ? params.data.value
            ? params.data.value + 400
            : params.data + 400
          : params.data.value
          ? params.data.value
          : params.data,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#4A90E2" }, // Gradient color at top
            { offset: 1, color: "#fff" }, // Gradient color at bottom
          ],
          global: false, // Set to true for global gradient, false for local
        },
        opacity: 0.5,
      },
    };
  }

  return option;
};
