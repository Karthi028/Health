import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RECORD_API = "/api/health/records";

const HealthRecord = ({ onRecordAdded }) => {
    const [formData, setFormData] = useState({
        systolic: "",
        diastolic: "",
        sugarLevel: "",
        pulse: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Formatting to match your Schema structure
            const payload = {
                bloodPressure: {
                    systolic: Number(formData.systolic),
                    diastolic: Number(formData.diastolic),
                },
                sugarLevel: Number(formData.sugarLevel),
                pulse: Number(formData.pulse),
            };

            await axios.post(RECORD_API, payload, { withCredentials: true });
            toast.success("Record saved successfully!");
            setFormData({ systolic: "", diastolic: "", sugarLevel: "", pulse: "" });
            if (onRecordAdded) onRecordAdded(); // Refresh the chart
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save record");
        }
    };

    return (
        <div className="max-w-md bg-white p-6 rounded-xl shadow-md border mt-8 ml-2 border-cyan-100">
            <h2 className="text-xl font-bold text-cyan-700 mb-4">Add Daily Reading</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Systolic (Top)</label>
                        <input
                            type="number"
                            required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            value={formData.systolic}
                            onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Diastolic (Bottom)</label>
                        <input
                            type="number"
                            required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                            value={formData.diastolic}
                            onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sugar Level (mg/dL)</label>
                    <input
                        type="number"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        value={formData.sugarLevel}
                        onChange={(e) => setFormData({ ...formData, sugarLevel: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pulse (BPM)</label>
                    <input
                        type="number"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        value={formData.pulse}
                        onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition">
                    Save Reading
                </button>
            </form>
        </div>
    );
};

export default HealthRecord;