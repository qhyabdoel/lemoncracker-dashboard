interface DataItemProps {
  month: string;
  value: number;
}

interface MetricDataProps {
  month: string;
  total_interactions: number;
  unique_users: number;
  cta_click_count: number;
  average_time_spent: number;
}

type ValueKeyProp =
  | "total_interactions"
  | "unique_users"
  | "cta_click_count"
  | "average_time_spent";

interface GenerateChartDataProps {
  valueKey: ValueKeyProp;
  xAxisData: Array<string>;
  selectedIndex: number;
  data: Array<MetricDataProps>;
}
