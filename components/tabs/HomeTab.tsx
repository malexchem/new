const HomeTab = ({ user }: { user: any }) => {
  const features = {
    supplier: [
      { title: 'Product Management', desc: 'Manage your catalog and inventory', icon: '📦' },
      { title: 'Order Processing', desc: 'Handle school orders efficiently', icon: '🛒' },
      { title: 'Sales Analytics', desc: 'Track performance and growth', icon: '📈' },
      { title: 'Payment Tracking', desc: 'Monitor commissions and payouts', icon: '💳' }
    ],
    school: [
      { title: 'Product Catalog', desc: 'Browse verified suppliers', icon: '🏬' },
      { title: 'Quotation Requests', desc: 'Get competitive pricing', icon: '📋' },
      { title: 'Order Tracking', desc: 'Monitor delivery progress', icon: '🚚' },
      { title: 'Procurement Records', desc: 'Audit-ready documentation', icon: '📊' }
    ],
    admin: [
      { title: 'User Management', desc: 'Approve and monitor accounts', icon: '👥' },
      { title: 'Transaction Oversight', desc: 'Monitor platform activity', icon: '💳' },
      { title: 'Revenue Analytics', desc: 'Track platform performance', icon: '📈' },
      { title: 'System Health', desc: 'Ensure platform stability', icon: '⚙️' }
    ]
  };

  const userFeatures = features[user.role as keyof typeof features] || features.supplier;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">WestEd Systems Platform</h1>
        <p className="text-xl opacity-90">Transforming Education Procurement in Kenya</p>
        <p className="mt-2 opacity-80">Streamlined • Transparent • Efficient</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition-shadow">
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Efficiency</h3>
            <p className="text-gray-600 text-sm">Streamlined procurement processes save time and resources</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600 text-sm">Clear pricing and audit trails for all transactions</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Growth</h3>
            <p className="text-gray-600 text-sm">Expand your reach in the education sector</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;