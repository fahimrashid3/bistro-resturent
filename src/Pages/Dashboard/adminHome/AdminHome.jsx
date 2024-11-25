import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: adminStats, isLoading: adminStatsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("adminStats");
      return res.data;
    },
  });
  const { data: orderStats, isLoading: orderStatsLoading } = useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStats");
      return res.data;
    },
  });

  if (adminStatsLoading || orderStatsLoading) {
    return (
      <span className="loading loading-infinity loading-lg text-warning"></span>
    );
  }
  const { userCount, menuCount, paymentCount, revenue } = adminStats;

  // custom shape for bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom style for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  //
  const pieChartData = orderStats.map((data) => {
    return {
      name: data.category,
      value: data.revenue,
    };
  });
  return (
    <div>
      <h2 className="text-3xl">Hi welcome : {user.name}</h2>
      <div className="stats shadow w-full md:mt-10 mt-2">
        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value">{userCount}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <IoFastFoodSharp />
          </div>
          <div className="stat-title">Total Items</div>
          <div className="stat-value">{menuCount}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <SiTicktick />
          </div>
          <div className="stat-title">Total Order</div>
          <div className="stat-value">{paymentCount}</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary text-4xl">
            <GiProfit />
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{revenue}</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>
      <div className="md:flex">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={600}
              height={400}
              data={orderStats}
              margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {orderStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData} // Correct data source
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value" // Use the value for chart rendering
                nameKey="name" // Specify the nameKey for the legend
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
