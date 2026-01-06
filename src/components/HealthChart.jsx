import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthBarChart = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/health/records", { withCredentials: true });
      setRecords(Array.isArray(res.data) ? res.data : res.data.records || []);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const chartData = records.map(record => ({
    date: new Date(record.recordedAt).toLocaleDateString(),
    systolic: record.bloodPressure?.systolic || 0,
    diastolic: record.bloodPressure?.diastolic || 0,
    sugar: record.sugarLevel,
    pulse: record.pulse
  }));

  if (loading) return <p className="text-center mt-8 text-cyan-600 font-medium">Loading Health Data...</p>;
  if (records.length === 0) return <p className="text-center mt-8 text-gray-500">No records found to display.</p>;

  return (
    <div className="w-full max-w-5xl h-[450px] bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Health Metrics Comparison</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{fontSize: 12}} />
          <YAxis tick={{fontSize: 12}} />
          <Tooltip 
            cursor={{fill: '#f9fafb'}} 
            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          
          {/* Bar groups */}
          <Bar dataKey="systolic" fill="#ef4444" name="Systolic BP" radius={[4, 4, 0, 0]} />
          <Bar dataKey="diastolic" fill="#f97316" name="Diastolic BP" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sugar" fill="#06b6d4" name="Sugar Level" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pulse" fill="#8b5cf6" name="Pulse" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthBarChart;