import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Navbar from '../wrapper/Navbar';

const HealthDashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/health/records", { withCredentials: true });
        const data = Array.isArray(res.data) ? res.data : res.data.records || [];
        // Sort by date so bars appear in chronological order
        setRecords(data.sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt)));
      } catch (err) {
        console.error("Error fetching records:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const chartData = records.map(r => ({
    date: new Date(r.recordedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    systolic: r.bloodPressure.systolic,
    diastolic: r.bloodPressure.diastolic,
    sugar: r.sugarLevel,
    pulse: r.pulse,
  }));

  if (loading) return <div className="p-10 text-center text-cyan-600">Loading charts...</div>;

  return (
    <><Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">

        <h2 className="text-2xl font-bold text-gray-800 mb-8">Daily Health Analytics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1: Blood Pressure */}
          <ChartCard title="Blood Pressure" unit="mmHg" icon="❤️">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} tickMargin={5} />
              <YAxis fontSize={10} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="systolic" fill="#ef4444" radius={[4, 4, 0, 0]} name="Systolic" />
              <Bar dataKey="diastolic" fill="#fca5a5" radius={[4, 4, 0, 0]} name="Diastolic" />
            </BarChart>
          </ChartCard>

          {/* Card 2: Sugar Level */}
          <ChartCard title="Sugar Level" unit="mg/dL" icon="🩸">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="sugar" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Sugar" />
            </BarChart>
          </ChartCard>

          {/* Card 3: Pulse Rate */}
          <ChartCard title="Pulse Rate" unit="BPM" icon="⚡">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="pulse" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Pulse" />
            </BarChart>
          </ChartCard>

        </div>
      </div>
    </>);
};

// Reusable Card Wrapper to keep code clean
const ChartCard = ({ title, unit, icon, children }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{unit}</p>
      </div>
      <span className="text-2xl bg-gray-50 p-2 rounded-lg">{icon}</span>
    </div>
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

export default HealthDashboard;