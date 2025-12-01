import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Application {
  created_at: string;
  status: "Ny" | "Granskad" | "Kontaktad";
}

export default function ApplicationCharts({ applications }: { applications: Application[] }) {
  // Group by month
  const monthly = applications.reduce((acc, app) => {
    const month = new Date(app.created_at).toLocaleString("sv-SE", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthly).map(([month, count]) => ({
    month,
    count,
  }));

  // Pie chart data
  const statusCount = {
    Ny: applications.filter((a) => a.status === "Ny").length,
    Granskad: applications.filter((a) => a.status === "Granskad").length,
    Kontaktad: applications.filter((a) => a.status === "Kontaktad").length,
  };

  const pieData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#3b82f6", "#a855f7", "#22c55e"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">

      {/* LINE CHART */}
      <div className="p-6 bg-white border rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Ansökningar per månad</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="p-6 bg-white border rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Statusfördelning</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
