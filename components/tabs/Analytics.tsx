const AnalyticsTab = ({ role }: { role: string }) => {
  // Analytics data based on role
  const analyticsData = {
    supplier: {
      revenue: { current: 2450000, previous: 1980000, change: 23.7 },
      orders: { current: 142, previous: 118, change: 20.3 },
      products: { current: 47, previous: 42, change: 11.9 },
      rating: { current: 4.8, previous: 4.7, change: 2.1 }
    },
    school: {
      spending: { current: 1250000, previous: 980000, change: 27.6 },
      orders: { current: 34, previous: 28, change: 21.4 },
      suppliers: { current: 12, previous: 9, change: 33.3 },
      savings: { current: 245000, previous: 180000, change: 36.1 }
    },
    admin: {
      revenue: { current: 24500000, previous: 19800000, change: 23.7 },
      users: { current: 1247, previous: 984, change: 26.7 },
      transactions: { current: 8924, previous: 7123, change: 25.3 },
      growth: { current: 34.2, previous: 28.1, change: 21.7 }
    }
  };

  const currentData = analyticsData[role as keyof typeof analyticsData] || analyticsData.supplier;

  const chartData = {
    monthlyRevenue: [45, 52, 48, 61, 55, 68, 72, 75, 70, 78, 82, 85],
    categories: ['Lab Equipment', 'Curriculum', 'Sports', 'Technology', 'Apparel'],
    categoryRevenue: [45, 25, 15, 10, 5],
    topProducts: [
      { name: 'Science Kit', sales: 142, revenue: 2450000 },
      { name: 'Sports Set', sales: 89, revenue: 1780000 },
      { name: 'ICT Lab', sales: 23, revenue: 4500000 },
      { name: 'CBC Materials', sales: 156, revenue: 890000 },
      { name: 'Uniforms', sales: 78, revenue: 456000 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(currentData).map(([key, data]: [string, any]) => (
          <div key={key} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key === 'spending' ? 'Total Spending' : 
                   key === 'savings' ? 'Total Savings' :
                   key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {typeof data.current === 'number' && data.current > 1000 ? 
                   `KSh ${(data.current / 1000000).toFixed(1)}M` : 
                   data.current}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                data.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {data.change >= 0 ? '+' : ''}{data.change}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(data.change + 50, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {role === 'school' ? 'Spending' : 'Revenue'} Overview
          </h3>
          <div className="h-64 flex items-end gap-2">
            {chartData.monthlyRevenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-red-600 to-red-500 rounded-t-lg transition-all duration-500 hover:from-red-700 hover:to-red-600"
                  style={{ height: `${(value / 100) * 80}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h3>
          <div className="space-y-4">
            {chartData.categories.map((category, index) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][index]
                    }}
                  ></div>
                  <span className="font-medium text-gray-900">{category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${chartData.categoryRevenue[index] * 2}%`,
                        backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][index]
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900 w-12 text-right">
                    {chartData.categoryRevenue[index]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products/Suppliers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {role === 'supplier' ? 'Top Products' : role === 'school' ? 'Top Suppliers' : 'Platform Growth'}
          </h3>
          <div className="space-y-4">
            {chartData.topProducts.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.sales} {role === 'supplier' ? 'sales' : 'orders'}</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">
                  KSh {(item.revenue / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Performance Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-red-200 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24h</div>
            <div className="text-red-200 text-sm">Avg Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.8</div>
            <div className="text-red-200 text-sm">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">89%</div>
            <div className="text-red-200 text-sm">Retention</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">47%</div>
          <div className="text-gray-900 font-semibold">Lab Equipment</div>
          <div className="text-gray-600 text-sm">Top Category</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">142</div>
          <div className="text-gray-900 font-semibold">Repeat Schools</div>
          <div className="text-gray-600 text-sm">Loyal Customers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">12</div>
          <div className="text-gray-900 font-semibold">Counties</div>
          <div className="text-gray-600 text-sm">Active Regions</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;