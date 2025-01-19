/* eslint-disable react/prop-types */
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useLoadUser from "../hooks/useLoadUser";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

// Colors for Pie chart sections
const colors = ["#0088FE", "#FF742F", "#00C49F", "#FFBB28"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
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

// for pie chart
const renderCustomizedLabel = ({ value }) => {
  return `Total Payment: ${value} tk`;
};

const AdminDashboard = () => {
  const [user] = useLoadUser();
  const axiosSecure = useAxiosSecure();
  const [totalPayment, setTotalPayment] = useState([]);

  const { data: chartData = [] } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`admin-stats`);
      return data;
    },
  });

  // Get total payment
  useEffect(() => {
    axiosSecure.get("/admin-total-payment").then((res) => {
      setTotalPayment(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-8">
      <div className="text-center">
        <h3 className="text-center text-xl">
          Welcome, <strong className="text-green-600">{user.name}!</strong>
        </h3>
        <p>Empowering you to manage and oversee everything seamlessly.</p>
      </div>

      <div className="shadow-xl lg:flex justify-between items-center">
        <div className="lg:w-1/2">
          {/* Bar Chart */}
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="value"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="lg:w-1/2 ">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={totalPayment}
                cx="50%"
                cy="50%"
                label={renderCustomizedLabel}
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {totalPayment.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
