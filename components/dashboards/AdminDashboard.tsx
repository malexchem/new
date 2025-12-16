const AdminDashboard = ({ userData }: { userData: any }) => {
  const stats = [
    { label: 'Total Users', value: userData.users, change: '+15%' },
    { label: 'Transactions', value: userData.transactions, change: '+32%' },
    { label: 'Platform Revenue', value: 'KSh 2.4M', change: '+18%' },
    { label: 'Pending Approvals', value: 8, change: '-3' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Overview</h2>
        <p className="text-gray-600">Platform administration and monitoring</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((activity) => (
              <div key={activity} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">New supplier registration</p>
                  <p className="text-sm text-gray-600">LabTech Solutions • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Uptime</span>
              <span className="text-green-600 font-semibold">99.98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Sessions</span>
              <span className="text-red-600 font-semibold">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Response Time</span>
              <span className="text-green-600 font-semibold">128ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;