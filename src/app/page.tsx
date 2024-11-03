"use client";

import Image from "next/image";
import DateRangeFilter from "@/components/filters/date-range-picker";
import EChartsReact, { EChartsOption } from "echarts-for-react";
import TopCardsItem from "@/components/cards/top-cards-item";

import imageCracker from "@/assets/images/header-cracker.svg";
import iconDarkEye from "@/assets/icons/icon-square-dark-eye.svg";
import iconDarkUpLeft from "@/assets/icons/icon-square-dark-up-left.svg";
import iconDarkClock from "@/assets/icons/icon-square-dark-clock.svg";
import iconDarkTarget from "@/assets/icons/icon-square-dark-target.svg";
import iconLightTarget from "@/assets/icons/icon-square-light-target.svg";
import iconLightClock from "@/assets/icons/icon-square-light-clock.svg";
import iconLightUpLeft from "@/assets/icons/icon-square-light-up-left.svg";
import iconLightEye from "@/assets/icons/icon-square-light-eye.svg";

import {
  formatDate,
  formatIntTimes,
  formatValue,
  generateChartOpt,
} from "@/utils";
import getData from "@/data";
import { useEffect, useRef, useState } from "react";
import LeftCardsItem from "@/components/cards/left-cards-item";
import generateChartData from "@/data/chart-data";
import { chartTitleList } from "@/const";

export default function Home() {
  const [chartOpt, setChartOpt] = useState<EChartsOption>();
  const echartRef = useRef<EChartsReact>(null);
  const [dataKey, setDataKey] = useState<ValueKeyProp>("total_interactions");
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [startDate, setStartDate] = useState("November 2023");
  const [endDate, setEndDate] = useState("October 2024");
  const [setisConsts, setSeriesConsts] = useState<Array<MetricDataProps>>([]);
  const [seriesData, setSeriesData] = useState<Array<MetricDataProps>>();
  const [chartAxisData, serChartAxisData] = useState<Array<string>>([]);
  const [axisConsts, setAxisConsts] = useState<Array<string>>([]);
  const [selectedDataObj, setSelectedDataObj] = useState<MetricDataProps>();

  useEffect(() => {
    // console.log({ startDate, endDate });

    // Find the indices for the start and end months
    if (seriesData) {
      const startIndex = setisConsts.findIndex((m) => m.month === startDate);
      const endIndex = setisConsts.findIndex((m) => m.month === endDate);

      // Slice the array from startIndex to endIndex + 1 (to include "April 2024")
      const result = setisConsts.slice(startIndex, endIndex + 1);
      const newAxisData = axisConsts.slice(startIndex, endIndex + 1);

      setSeriesData(result);
      serChartAxisData(newAxisData);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    if (seriesData) {
      const metricsItem = seriesData[selectedDataIndex];
      if (metricsItem) setSelectedDataObj(metricsItem);
    }
  }, [selectedDataIndex, seriesData]);

  useEffect(() => {
    getData().then((res) => {
      serChartAxisData(res.xAxisData);
      setAxisConsts(res.xAxisData);
      setSeriesData(res.data);
      setSeriesConsts(res.data);
      setSelectedDataIndex(Math.round(res.data.length / 2));
    });
  }, []);

  useEffect(() => {
    if (seriesData && seriesData && chartAxisData && selectedDataIndex) {
      const generateChartDataParams: GenerateChartDataProps = {
        valueKey: dataKey,
        xAxisData: chartAxisData,
        selectedIndex: selectedDataIndex,
        data: seriesData,
      };
      const optios = generateChartData(generateChartDataParams);
      setChartOpt(optios);
    }
  }, [chartAxisData, dataKey, selectedDataIndex, seriesData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChartClick = (params: any) => {
    if (echartRef.current) {
      const chart = echartRef.current.getEchartsInstance();
      const option = generateChartOpt(chart, params);

      // Apply the updated options
      chart.setOption(option);
      setSelectedDataIndex(params.dataIndex);
    }
  };

  return (
    <div>
      {/* header */}
      <div className="flex mb-4">
        <div className="mr-2">
          <Image alt="image" src={imageCracker} />
        </div>
        <div>
          <div className="text-xs mb-1">{"ABC Cracker > Lemon Cracker"}</div>
          <div className="text-3xl text-black">Lemon Cracker</div>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex-auto text-sm">Here will be some text</div>
        <div className="flex-auto">
          <DateRangeFilter
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            endDate={endDate}
            startDate={startDate}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <TopCardsItem
          title="Total number of interactions"
          amount={formatValue(selectedDataObj?.total_interactions)}
          icon={
            dataKey === "total_interactions" ? iconLightTarget : iconDarkTarget
          }
          active={dataKey === "total_interactions"}
          handleClick={() => setDataKey("total_interactions")}
        />
        <TopCardsItem
          title="Total number of unique users"
          amount={formatValue(selectedDataObj?.unique_users)}
          icon={dataKey === "unique_users" ? iconLightEye : iconDarkEye}
          active={dataKey === "unique_users"}
          handleClick={() => setDataKey("unique_users")}
        />
        <TopCardsItem
          title="CTA click count"
          amount={formatValue(selectedDataObj?.cta_click_count)}
          icon={
            dataKey === "cta_click_count" ? iconLightUpLeft : iconDarkUpLeft
          }
          active={dataKey === "cta_click_count"}
          handleClick={() => setDataKey("cta_click_count")}
        />
        <TopCardsItem
          title="Average time spent"
          amount={formatIntTimes(selectedDataObj?.total_interactions)}
          icon={
            dataKey === "average_time_spent" ? iconLightClock : iconDarkClock
          }
          active={dataKey === "average_time_spent"}
          handleClick={() => setDataKey("average_time_spent")}
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="inline-flex w-full">
          <div className="w-5/6 text-xl text-gray-900">
            <label>{chartTitleList[dataKey]}</label>
            <div>
              {chartOpt ? (
                <EChartsReact
                  style={{ height: "400px" }}
                  option={chartOpt}
                  ref={echartRef}
                  onEvents={{ click: handleChartClick }}
                />
              ) : (
                <div className="w-full text-center mt-32 text-2xl font-semibold text-gray-400">
                  Loading chart....
                </div>
              )}
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full text-right mb-4">
              <label className="text-sm">
                {formatDate(selectedDataObj?.month)}
              </label>
            </div>
            <div>
              <LeftCardsItem
                title="Total number of interactions"
                value={formatValue(selectedDataObj?.total_interactions)}
              />
              <LeftCardsItem
                title="Total number of unique users"
                value={formatValue(selectedDataObj?.unique_users)}
              />
              <LeftCardsItem
                title="CTA click count"
                value={formatValue(selectedDataObj?.cta_click_count)}
              />
              <LeftCardsItem
                title="Average time spent"
                value={formatIntTimes(selectedDataObj?.average_time_spent)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
