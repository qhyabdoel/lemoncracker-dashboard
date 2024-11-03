const hitAPI = async () => {
  const response = await fetch("https://lemoncracker-be.vercel.app/metrics");
  const resJson = response.json();
  // console.log({ resJson });
  return resJson;
};

const getData = async () => {
  const response = await hitAPI();

  const xAxisData = response.map((el: MetricDataProps) =>
    el.month.substring(0, 3)
  );

  return { data: response, xAxisData };
};

export default getData;
