import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card } from "reactstrap";
import {
  useGetMonthlyGraphQuery,
  useGetYearlyGraphQuery,
} from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";

const TurnOverGraph = ({ token }) => {
  const [chartType, setChartType] = useState("monthly");
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { data: monthlyData, isLoading: isLoadingMonthly } =
    useGetMonthlyGraphQuery({ token });
  const { data: yearlyData, isLoading: isLoadingYearly } =
    useGetYearlyGraphQuery({ token });

  useEffect(() => {
    if (chartType === "monthly" && monthlyData?.result?.length > 0) {
      const categories = monthNames;
      const series = new Array(12).fill(0);

      monthlyData.result.forEach((item) => {
        series[parseInt(item.month) - 1] = parseFloat(item.total_amount);
      });

      setChartData({ categories, series });
    } else if (chartType === "yearly" && yearlyData?.result?.length > 0) {
      const categories = [];
      const series = [];

      yearlyData.result.forEach((item) => {
        categories.push(item.year);
        series.push(parseFloat(item.total_amount));
      });

      setChartData({ categories, series });
    }
  }, [chartType, monthlyData, yearlyData]);

  const options = {
    chart: {
      id: "apexchart-bar",
      toolbar: {
        show: true,
      },
      height: 300, 
    },
    colors: ["#0F6D6A"],
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val > 0 ? `CHF ${val}` : "";
      },
      offsetY: -20,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return `CHF ${val}`;
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `CHF ${val}`;
        },
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "bottom",
              },
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const seriesData = [
    {
      name:
        chartType === "monthly"
          ? "Monthly Transactions"
          : "Yearly Transactions",
      data: chartData.series,
    },
  ];

  return (
    <Card className="profile-details-card px-2 py-1 shadow-sm">
      <div className="d-flex justify-content-between">
        <h4 className="my-color" style={{ margin: 0 }}>
          Turnover Chart
        </h4>
        <div className="d-flex align-items-center">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              width: "auto",
              padding: ".375rem 1.75rem .375rem .75rem",
              fontSize: "1rem",
              lineHeight: 1.5,
              borderRadius: ".25rem",
              border: "1px solid #ced4da",
            }}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      {(isLoadingMonthly && chartType === "monthly") ||
      (isLoadingYearly && chartType === "yearly") ? (
        <ComponentSpinner />
      ) : (
        <div style={{ height: "350px" }}>
          <Chart
            options={options}
            series={seriesData}
            type="bar"
            height="100%" 
          />
        </div>
      )}
    </Card>
  );
};

export default TurnOverGraph;
