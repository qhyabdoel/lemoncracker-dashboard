import ChartTooltip from "@/components/charts/tooltip";
import { formatDate, formatIntTimes, formatValue } from "@/utils";
import { renderToString } from "react-dom/server";

const generateChartData = ({
  valueKey,
  xAxisData,
  selectedIndex,
  data,
}: GenerateChartDataProps) => {
  const lineData = data.map((item) => item[valueKey]);
  const barData = data.map((item, index) => {
    const itemValue =
      item[valueKey] +
      (valueKey === "total_interactions"
        ? 650
        : valueKey === "unique_users"
        ? 15
        : valueKey === "average_time_spent"
        ? 50
        : 500);
    return index === selectedIndex
      ? {
          value: itemValue,
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
        }
      : itemValue;
  });

  const chartOpt = {
    animation: false,
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLine: {
        show: false, // Hide the x-axis line
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => formatValue(value),
      },
    },
    tooltip: {
      trigger: "axis",
      borderRadius: 24,
      position: function (
        point: [number, number],
        params: Array<{ data: number }>,
        dom: HTMLElement,
        rect: { x: number; y: number; width: number; height: number },
        size: { contentSize: [number, number]; viewSize: [number, number] }
      ) {
        // Adjust tooltip position above the bar
        return [
          point[0] - size.contentSize[0] / 2,
          point[1] - size.contentSize[1] - 32,
        ];
      },

      formatter: (params: Array<{ data: number; name: string }>) => {
        const lineData =
          valueKey === "average_time_spent"
            ? formatIntTimes(params[0].data)
            : formatValue(params[0].data);

        const dataItem = data?.find((item) =>
          item.month.includes(params[0].name)
        );

        const monthStr = dataItem ? formatDate(dataItem?.month) : "";
        return renderToString(
          <ChartTooltip lineData={lineData} monthStr={monthStr} />
        );
      },
    },
    series: [
      {
        name: "Line Series",
        type: "line",
        data: lineData,
        lineStyle: { opacity: 0 },
        symbolSize: 12,
        symbol: "circle",
        itemStyle: { color: "#4A90E2" },
        markLine: {
          silent: true, // Prevent tooltip display on hover over markLine
          symbol: "none", // Remove endpoints on the line,
          label: { show: false },
          lineStyle: {
            color: "rgba(150,150,150,0.3)", // Line color
            type: "solid",
            width: 1,
          },
          data: xAxisData.map((value) => ({ xAxis: value })),
        },
      },
      {
        name: "Bar Series",
        type: "bar",
        data: barData,
        itemStyle: {
          color: "rgba(200,200,200,0)", // Fully transparent initially
          borderRadius: [50, 50, 0, 0],
        },
        emphasis: {
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
        },
      },
    ],
  };

  return chartOpt;
};

export default generateChartData;
