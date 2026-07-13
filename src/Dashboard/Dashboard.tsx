import "./Dashboard.css";

// Sample data according to the design mockup
const safeData = [
  { id: 'SafeVault-091', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-114', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-091', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-114', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
];

export function DashboardContent() {
  return (
    <div className="p-6 text-white max-w-7xl mx-auto space-y-6">
      {/* Header Titles */}
      <div>
        <h1 className="text-3xl font-semibold tracking-wide">Manufacturer Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview and distribution statistics of your registered safes.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Connectivity Status Card */}
        <div className="bg-[#1e2330] p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">Connectivity Status</h3>
          <div className="mt-4 flex items-baseline space-x-6">
            <div>
              <span className="text-4xl font-bold">720</span>
              <span className="ml-2 text-xs text-green-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span> ACTIVE
              </span>
            </div>
            <div>
              <span className="text-4xl font-bold text-gray-300">130</span>
              <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span> INACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Total Safes Card */}
        <div className="bg-[#1e2330] p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">Total Safes</h3>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-4xl font-bold">850</span>
            <span className="text-gray-500">🛡️</span> 
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-[#1e2330] p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-4xl font-bold">980</span>
            <span className="text-gray-500 text-xl">👤</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#1e2330] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-medium text-gray-300">Safe Registration and Firmware Version Distribution</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1e2a] text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4 text-center">Safe ID</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Connection Status</th>
                <th className="px-6 py-4">Firmware Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-sm font-mono text-gray-300">
              {safeData.map((safe, index) => (
                <tr key={index} className="hover:bg-gray-800/20">
                  <td className="px-6 py-4 text-center font-semibold">{safe.id}</td>
                  <td className="px-6 py-4 text-gray-400">{safe.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      safe.status === 'Online' 
                        ? 'bg-green-950/50 text-green-400 border border-green-800/30' 
                        : 'bg-red-950/50 text-red-400 border border-red-800/30'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${safe.status === 'Online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      {safe.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{safe.firmware}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-[#1a1e2a] border-t border-gray-800 flex justify-center items-center space-x-4 text-sm text-gray-400">
          <button className="hover:text-white transition">&lt;</button>
          <span>Page 1 to 50</span>
          <button className="hover:text-white transition">&gt;</button>
        </div>
      </div>
    </div>
  );
}
