import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../wrapper/Navbar"; // Adjust path as needed

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/auth/me", {
                    withCredentials: true,
                });
                // Accessing .User because of your controller: res.json({ User: user })
                setUserData(response.data.User);
            } catch (error) {
                console.error("Profile fetch error:", error);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="text-center mt-20 text-cyan-600">Loading Profile...</div>;
    if (!userData) return <div className="text-center mt-20 text-red-500">No user data found.</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Profile Header Background */}
                    <div className="h-32 from-cyan-500 to-blue-600"></div>

                    <div className="px-8 pb-8">
                        {/* Avatar Circle */}
                        <div className="relative -top-12 flex items-end gap-5">
                            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 text-3xl font-bold border-2 border-cyan-500">
                                    {userData.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="pb-2">
                                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                                <p className="text-gray-500">{userData.email}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <DetailCard label="Full Name" value={userData.name} icon="👤" />
                            <DetailCard label="Email Address" value={userData.email} icon="✉️" />
                            <DetailCard label="Age" value={`${userData.age} years`} icon="🎂" />
                            <DetailCard label="Gender" value={userData.gender} icon="🚻" />
                            <DetailCard
                                label="Joined On"
                                value={new Date(userData.createdAt).toLocaleDateString()}
                                icon="📅"
                            />
                            <DetailCard
                                label="Last Update"
                                value={new Date(userData.updatedAt).toLocaleTimeString()}
                                icon="🔄"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Sub-component for clean code
const DetailCard = ({ label, value, icon }) => (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
        <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-gray-700 font-medium">{value || "Not provided"}</p>
            </div>
        </div>
    </div>
);

export default Profile;