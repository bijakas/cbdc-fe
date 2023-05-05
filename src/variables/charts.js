// Daily Traffic Dashboards Default


export const barChartDataDailyTraffic = [
  {
    name: "Daily Transactions",
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

// {
          
//   series: [{
//     data: [44, 55, 41, 64, 22, 43, 21]
//   }, {
//     data: [53, 32, 33, 52, 13, 44, 32]
//   }],
//   options: {
//     chart: {
//       type: 'bar',
//       height: 430
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         dataLabels: {
//           position: 'top',
//         },
//       }
//     },
//     dataLabels: {
//       enabled: true,
//       offsetX: -6,
//       style: {
//         fontSize: '12px',
//         colors: ['#fff']
//       }
//     },
//     stroke: {
//       show: true,
//       width: 1,
//       colors: ['#fff']
//     },
//     tooltip: {
//       shared: true,
//       intersect: false
//     },
//     xaxis: {
//       categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
//     },
//   },


//};

export const barChartDataGroupByParticipants = [{data: [1, 1]},{data: [2, 2]},{ data: [1, 1]}]

export const barChartOptionsGroupByParticipants = {
  chart: {
    type: 'bar',
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
//    categories: ["BMRIDJA", "CENAIDJA"],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: true,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#2596be", "#8533ff", "#ff4dd2"],
  },
  legend: {
    show: true,
  },
  colors: ["#2596be", "#8533ff", "#ff4dd2"],
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: "50px",
    },
  },
};

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["00", "04", "08", "12", "14", "16", "18"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#045498",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#045498",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

// Consumption Users Reports

export const barChartDataConsumption = [
  {
    name: "PRODUCT A",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT B",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT C",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
];

export const barChartOptionsConsumption = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  legend: {
    show: false,
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

export const pieChartOptions = {
  labels: ["BCA", "MANDIRI", "BRI", "BNI"],
 // colors: ["#4318FF", "#6AD2FF", "#EFF4FB", "#EFF4FB"],
  chart: {
    width: "60px",
    type: 'donut'
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: true,
    position: 'bottom'
  },
  
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#111']
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      borderWidth: 0
    }
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: true,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    //colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
  
};

export const pieChartData = [20, 10, 40,30];

// Total Spent Default

export const lineChartDataTotalSpent = [
  {
    name: "Total Money",
    data: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      250000,
      250000,
      250000,
      250000,
      250000,
      950000,
      950000,
      950000,
      950000,
      950000,
      950000,
      950000,
      950000,
      950000
  ],
  },
];

export const lineChartOptionsTotalSpent = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#39B8FF", "#39B8AA", "#39B8BB"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 1,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: false,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  // stroke: {
  //   curve: "smooth",
  //   type: "line",
  // },
  xaxis: {
    type: "numeric",
    categories: [
      "13-04-23 00:00",
      "13-04-23 01:00",
      "13-04-23 02:00",
      "13-04-23 03:00",
      "13-04-23 04:00",
      "13-04-23 05:00",
      "13-04-23 06:00",
      "13-04-23 07:00",
      "13-04-23 08:00",
      "13-04-23 09:00",
      "13-04-23 10:00",
      "13-04-23 11:00",
      "13-04-23 12:00",
      "13-04-23 13:00",
      "13-04-23 14:00",
      "13-04-23 15:00",
      "13-04-23 16:00",
      "13-04-23 17:00",
      "13-04-23 18:00",
      "13-04-23 19:00",
      "13-04-23 20:00",
      "13-04-23 21:00",
      "13-04-23 22:00",
      "13-04-23 23:00",
      "14-04-23 00:00"
  ],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  legend: {
    show: true,
  },
  grid: {
    show: true,
    column: {
      color: ["#7551FF", "#39B8FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF", "#39B8FF"],
};

export const lineChartOptionsTotalSpent1 = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#39B8FF", "#39B8AA", "#39B8BB"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 1,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: false,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  // stroke: {
  //   curve: "smooth",
  //   type: "line",
  // },
  xaxis: {
    type: "Text",
    categories: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  legend: {
    show: true,
  },
  grid: {
    show: true,
    column: {
      color: ["#7551FF", "#39B8FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF", "#39B8FF"],
};


export const getLineChartOptionsTotalSpent = (arrCategories) => { return {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#2596be", "#8533ff", "#ff4dd2"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 1,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: false,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  // stroke: {
  //   curve: "smooth",
  //   type: "line",
  // },
  xaxis: {
    type: "text",
    categories: arrCategories,
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  legend: {
    show: true,
  },
  grid: {
    show: true,
    column: {
      color: ["#7551FF", "#39B8FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF", "#39B8FF"],
};
}
