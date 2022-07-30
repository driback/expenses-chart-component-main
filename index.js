const ctx = document.querySelector("#chart").getContext("2d");
const labels = ["mon", "tue", "wed", "thu", "fri", "sat"];
const datas = [17, 34, 52, 31, 23, 43, 25];
const backgroundColor = [];
const hoverBackgroundColor = [];

for (i = 0; i < datas.length; i++) {
  if (datas[i] <= 50) {
    backgroundColor.push("hsl(10, 79%, 65%)");
  }
  if (datas[i] >= 50) {
    backgroundColor.push("hsl(186, 34%, 60%)");
  }
}

for (i = 0; i < datas.length; i++) {
  if (datas[i] <= 50) {
    hoverBackgroundColor.push("hsl(10, 79%, 80%)");
  }
  if (datas[i] >= 50) {
    hoverBackgroundColor.push("hsl(186, 34%, 80%)");
  }
}

const data = {
  labels: labels,
  datasets: [
    {
      data: datas,
      backgroundColor: backgroundColor,
      borderRadius: 4,
      borderSkipped: false,
      hoverBackgroundColor: hoverBackgroundColor,
    },
  ],
};

const labelTooltip = (labelTooltips) => {
  return "$" + datas;
};

const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      tooltip: {
        yAlign: "bottom",
        caretSize: 0,
        caretPadding: 6,
        displayColors: false,
        backgroundColor: "hsl(25, 47%, 15%)",
        // backgroundColor: (color) => {
        //   console.log(color);
        // },

        usePointStyle: false,
        callbacks: {
          title: (title) => {
            return "";
          },
          label: (context) => {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          padding: 10,
        },
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    responsive: true,
  },
};

const chart = new Chart(ctx, config);
