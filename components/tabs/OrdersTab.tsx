const OrdersTab = ({ role }: { role: string }) => {
  // Dummy orders data
  const orders = [
    {
      id: "WES-2341",
      school: "Green Valley High School",
      items: 5,
      amount: 125000,
      status: "Delivered",
      date: "2024-01-15",
      priority: "Normal",
      supplier: "EduLab Kenya",
      timeline: { ordered: "2024-01-10", processed: "2024-01-12", shipped: "2024-01-13", delivered: "2024-01-15" }
    },
    {
      id: "WES-2342",
      school: "Sunrise Primary School",
      items: 3,
      amount: 78000,
      status: "Shipped",
      date: "2024-01-14",
      priority: "High",
      supplier: "SportPro Kenya",
      timeline: { ordered: "2024-01-08", processed: "2024-01-09", shipped: "2024-01-14", delivered: null }
    },
    {
      id: "WES-2343",
      school: "Mountain View Academy",
      items: 8,
      amount: 256000,
      status: "Processing",
      date: "2024-01-13",
      priority: "Normal",
      supplier: "TechEdu Solutions",
      timeline: { ordered: "2024-01-13", processed: "2024-01-13", shipped: null, delivered: null }
    },
    {
      id: "WES-2344",
      school: "Riverside Secondary",
      items: 2,
      amount: 45000,
      status: "Pending",
      date: "2024-01-12",
      priority: "Low",
      supplier: "Curriculum Solutions",
      timeline: { ordered: "2024-01-12", processed: null, shipped: null, delivered: null }
    },
    {
      id: "WES-2345",
      school: "Central Primary School",
      items: 6,
      amount: 89000,
      status: "Delivered",
      date: "2024-01-11",
      priority: "Normal",
      supplier: "Math Wizards",
      timeline: { ordered: "2024-01-05", processed: "2024-01-06", shipped: "2024-01-08", delivered: "2024-01-11" }
    },
    {
      id: "WES-2346",
      school: "Hope Academy",
      items: 4,
      amount: 67000,
      status: "Cancelled",
      date: "2024-01-10",
      priority: "Normal",
      supplier: "Uniform Masters",
      timeline: { ordered: "2024-01-10", processed: null, shipped: null, delivered: null }
    }
  ];

  const orderStats = [
    { label: "Total Orders", value: "1,247", change: "+18%" },
    { label: "Completed", value: "892", change: "+12%" },
    { label: "In Progress", value: "189", change: "+5%" },
    { label: "Revenue", value: "KSh 24.5M", change: "+23%" }
  ];

  const statusColors = {
    Delivered: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Pending: "bg-orange-100 text-orange-800",
    Cancelled: "bg-red-100 text-red-800"
  };

  const priorityColors = {
    High: "text-red-600",
    Normal: "text-green-600",
    Low: "text-blue-600"
  };

  return (
    <div className="space-y-6">
      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm">
              All Orders
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Pending
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Processing
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Shipped
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Delivered
            </button>
          </div>
          
          <div className="flex gap-3">
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>All Suppliers</option>
              <option>EduLab Kenya</option>
              <option>SportPro Kenya</option>
              <option>TechEdu Solutions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{role === 'supplier' ? 'School' : 'Supplier'}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-red-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {role === 'supplier' ? order.school : order.supplier}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-medium">{order.items} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">KSh {order.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${priorityColors[order.priority as keyof typeof priorityColors]}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-red-600 text-red-600 rounded text-sm hover:bg-red-50 transition-colors">
                        View
                      </button>
                      {role === 'supplier' && order.status === 'Pending' && (
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                          Process
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Timeline Preview */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Order Timeline Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((stage, index) => (
            <div key={stage} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">{['📥', '⚡', '🚚', '✅'][index]}</span>
              </div>
              <div className="text-lg font-semibold">1,024</div>
              <div className="text-red-200 text-sm">{stage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;