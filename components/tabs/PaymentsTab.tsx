const PaymentsTab = ({ role }: { role: string }) => {
  // Dummy payments data
  const payments = [
    {
      id: "PAY-7841",
      orderId: "WES-2341",
      amount: 125000,
      method: "M-Pesa",
      status: "Completed",
      date: "2024-01-15",
      recipient: "EduLab Kenya",
      payer: "Green Valley High School",
      fee: 6250,
      netAmount: 118750,
      transactionId: "MPE234567890",
      timeline: { initiated: "2024-01-15 10:30", processed: "2024-01-15 10:31", completed: "2024-01-15 10:32" }
    },
    {
      id: "PAY-7842",
      orderId: "WES-2342",
      amount: 78000,
      method: "Bank Transfer",
      status: "Processing",
      date: "2024-01-14",
      recipient: "SportPro Kenya",
      payer: "Sunrise Primary School",
      fee: 3900,
      netAmount: 74100,
      transactionId: "BT893456123",
      timeline: { initiated: "2024-01-14 14:22", processed: "2024-01-14 14:22", completed: null }
    },
    {
      id: "PAY-7843",
      orderId: "WES-2343",
      amount: 256000,
      method: "Purchase Order",
      status: "Pending",
      date: "2024-01-13",
      recipient: "TechEdu Solutions",
      payer: "Mountain View Academy",
      fee: 12800,
      netAmount: 243200,
      transactionId: "PO567890234",
      timeline: { initiated: "2024-01-13 09:15", processed: null, completed: null }
    },
    {
      id: "PAY-7844",
      orderId: "WES-2344",
      amount: 45000,
      method: "M-Pesa",
      status: "Failed",
      date: "2024-01-12",
      recipient: "Curriculum Solutions",
      payer: "Riverside Secondary",
      fee: 2250,
      netAmount: 42750,
      transactionId: "MPE890123456",
      timeline: { initiated: "2024-01-12 16:45", processed: "2024-01-12 16:45", completed: null }
    },
    {
      id: "PAY-7845",
      orderId: "WES-2345",
      amount: 89000,
      method: "Bank Transfer",
      status: "Completed",
      date: "2024-01-11",
      recipient: "Math Wizards",
      payer: "Central Primary School",
      fee: 4450,
      netAmount: 84550,
      transactionId: "BT456789012",
      timeline: { initiated: "2024-01-11 11:20", processed: "2024-01-11 11:21", completed: "2024-01-11 11:25" }
    },
    {
      id: "PAY-7846",
      orderId: "WES-2346",
      amount: 67000,
      method: "M-Pesa",
      status: "Refunded",
      date: "2024-01-10",
      recipient: "Uniform Masters",
      payer: "Hope Academy",
      fee: 3350,
      netAmount: 63650,
      transactionId: "MPE567890123",
      timeline: { initiated: "2024-01-10 13:10", processed: "2024-01-10 13:10", completed: "2024-01-10 13:11" }
    }
  ];

  // Payment statistics based on role
  const paymentStats = {
    supplier: [
      { label: "Total Revenue", value: "KSh 2.45M", change: "+18%" },
      { label: "Pending Payouts", value: "KSh 189K", change: "+12%" },
      { label: "Commission Paid", value: "KSh 122.5K", change: "+15%" },
      { label: "Success Rate", value: "98.2%", change: "+0.5%" }
    ],
    school: [
      { label: "Total Spent", value: "KSh 1.25M", change: "+23%" },
      { label: "Pending Payments", value: "KSh 256K", change: "+8%" },
      { label: "This Month", value: "KSh 345K", change: "+15%" },
      { label: "Savings", value: "KSh 245K", change: "+12%" }
    ],
    admin: [
      { label: "Platform Revenue", value: "KSh 24.5M", change: "+28%" },
      { label: "Commission", value: "KSh 1.23M", change: "+22%" },
      { label: "Pending Payouts", value: "KSh 3.45M", change: "+15%" },
      { label: "Success Rate", value: "97.8%", change: "+1.2%" }
    ]
  };

  const currentStats = paymentStats[role as keyof typeof paymentStats] || paymentStats.supplier;

  const statusColors = {
    Completed: "bg-green-100 text-green-800 border-green-200",
    Processing: "bg-blue-100 text-blue-800 border-blue-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Failed: "bg-red-100 text-red-800 border-red-200",
    Refunded: "bg-purple-100 text-purple-800 border-purple-200"
  };

  const methodColors = {
    "M-Pesa": "bg-green-50 text-green-700 border-green-200",
    "Bank Transfer": "bg-blue-50 text-blue-700 border-blue-200",
    "Purchase Order": "bg-orange-50 text-orange-700 border-orange-200"
  };

  // Payment methods data for visualization
  const paymentMethods = [
    { method: "M-Pesa", count: 1247, percentage: 65, color: "bg-green-500" },
    { method: "Bank Transfer", count: 489, percentage: 25, color: "bg-blue-500" },
    { method: "Purchase Order", count: 195, percentage: 10, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {stat.change}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(parseInt(stat.change) + 70, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm">
              All Payments
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Completed
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Processing
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Pending
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50">
              Failed
            </button>
          </div>
          
          <div className="flex gap-3">
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>All Methods</option>
              <option>M-Pesa</option>
              <option>Bank Transfer</option>
              <option>Purchase Order</option>
            </select>
            {role === 'school' && (
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors flex items-center gap-2">
                <span>+</span> Make Payment
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments List */}
        <div className="lg:col-span-2 space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${
                      payment.method === 'M-Pesa' ? 'bg-green-50 border-green-200' :
                      payment.method === 'Bank Transfer' ? 'bg-blue-50 border-blue-200' :
                      'bg-orange-50 border-orange-200'
                    }`}>
                      <span className="text-lg">
                        {payment.method === 'M-Pesa' ? '📱' :
                         payment.method === 'Bank Transfer' ? '🏦' : '📋'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{payment.id}</h3>
                      <p className="text-sm text-gray-600">Order: {payment.orderId}</p>
                      <p className="text-sm text-gray-600">
                        {role === 'supplier' ? `From: ${payment.payer}` : `To: ${payment.recipient}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">KSh {payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[payment.status as keyof typeof statusColors]
                    }`}>
                      {payment.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      methodColors[payment.method as keyof typeof methodColors]
                    }`}>
                      {payment.method}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Commission: <span className="font-medium text-red-600">KSh {payment.fee.toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Net: <span className="font-medium text-green-600">KSh {payment.netAmount.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Transaction: {payment.transactionId}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                      View Details
                    </button>
                    {payment.status === 'Failed' && (
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Retry
                      </button>
                    )}
                    {payment.status === 'Pending' && role === 'school' && (
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Analytics Sidebar */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={method.method} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{method.method}</span>
                    <span className="text-gray-600">{method.count} ({method.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${method.color}`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {role === 'school' && (
                <>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    Make New Payment
                  </button>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    View Payment History
                  </button>
                </>
              )}
              {role === 'supplier' && (
                <>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">💰</span>
                    Request Payout
                  </button>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    Revenue Report
                  </button>
                </>
              )}
              {role === 'admin' && (
                <>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    Process Payouts
                  </button>
                  <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                    <span className="text-xl">📈</span>
                    Financial Report
                  </button>
                </>
              )}
              <button className="w-full p-4 bg-red-50 rounded-xl text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                <span className="text-xl">🛡️</span>
                Payment Security
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "Payment completed", amount: "KSh 125,000", time: "2 min ago" },
                { action: "New payment initiated", amount: "KSh 78,000", time: "1 hour ago" },
                { action: "Payout processed", amount: "KSh 245,000", time: "3 hours ago" },
                { action: "Commission deducted", amount: "KSh 6,250", time: "5 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                    <p className="text-gray-600 text-xs">{activity.amount} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Payment Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">98.2%</div>
            <div className="text-red-200 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">45s</div>
            <div className="text-red-200 text-sm">Avg Processing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1.2K</div>
            <div className="text-red-200 text-sm">Monthly Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">0.2%</div>
            <div className="text-red-200 text-sm">Failure Rate</div>
          </div>
        </div>
      </div>

      {/* Upcoming Payouts */}
      {(role === 'supplier' || role === 'admin') && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {role === 'supplier' ? 'Expected Payouts' : 'Pending Payouts'}
          </h3>
          <div className="space-y-4">
            {[
              { supplier: "EduLab Kenya", amount: 245000, date: "2024-01-16", status: "Processing" },
              { supplier: "SportPro Kenya", amount: 178000, date: "2024-01-17", status: "Scheduled" },
              { supplier: "TechEdu Solutions", amount: 89000, date: "2024-01-18", status: "Scheduled" }
            ].map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payout.supplier}</p>
                  <p className="text-sm text-gray-600">Due: {payout.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">KSh {payout.amount.toLocaleString()}</p>
                  <span className="text-sm text-gray-600 capitalize">{payout.status}</span>
                </div>
              </div>
            ))}
          </div>
          {role === 'admin' && (
            <button className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Process All Payouts
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentsTab;