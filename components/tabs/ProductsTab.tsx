const ProductsTab = ({ role }: { role: string }) => {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Science Laboratory Kit",
      category: "Lab Equipment",
      price: 45000,
      stock: 24,
      supplier: "EduLab Kenya",
      rating: 4.8,
      orders: 142,
      image: "🔬",
      status: "In Stock"
    },
    {
      id: 2,
      name: "CBC Learning Materials",
      category: "Curriculum",
      price: 12000,
      stock: 56,
      supplier: "Curriculum Solutions",
      rating: 4.6,
      orders: 89,
      image: "📚",
      status: "In Stock"
    },
    {
      id: 3,
      name: "Sports Equipment Set",
      category: "Sports",
      price: 78000,
      stock: 8,
      supplier: "SportPro Kenya",
      rating: 4.9,
      orders: 67,
      image: "⚽",
      status: "Low Stock"
    },
    {
      id: 4,
      name: "ICT Computer Lab",
      category: "Technology",
      price: 450000,
      stock: 3,
      supplier: "TechEdu Solutions",
      rating: 4.7,
      orders: 23,
      image: "💻",
      status: "Limited"
    },
    {
      id: 5,
      name: "School Uniform Package",
      category: "Apparel",
      price: 2500,
      stock: 0,
      supplier: "Uniform Masters",
      rating: 4.5,
      orders: 156,
      image: "👕",
      status: "Out of Stock"
    },
    {
      id: 6,
      name: "Mathematics Learning Kit",
      category: "Curriculum",
      price: 8900,
      stock: 34,
      supplier: "Math Wizards",
      rating: 4.4,
      orders: 78,
      image: "🧮",
      status: "In Stock"
    }
  ];

  const categories = ["All", "Lab Equipment", "Curriculum", "Sports", "Technology", "Apparel", "Furniture"];
  const stats = [
    { label: "Total Products", value: "247", change: "+12%" },
    { label: "Categories", value: "18", change: "+2" },
    { label: "Top Rated", value: "4.8", change: "+0.1" },
    { label: "Low Stock", value: "12", change: "-3" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-red-200 text-red-700 hover:bg-red-50 transition-colors font-medium text-sm"
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>Sort by: Popular</option>
              <option>Sort by: Price Low-High</option>
              <option>Sort by: Price High-Low</option>
              <option>Sort by: Rating</option>
            </select>
            
            {role === 'supplier' && (
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                <span>+</span> Add Product
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{product.image}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                  product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{product.category} • {product.supplier}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500 text-sm">({product.orders} orders)</span>
                </div>
                <span className="text-2xl font-bold text-red-600">KSh {product.price.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock: {product.stock} units</span>
                <div className="flex gap-2">
                  {role === 'supplier' ? (
                    <>
                      <button className="px-3 py-1 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                        Manage
                      </button>
                    </>
                  ) : (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex-1">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Product Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">247</div>
            <div className="text-red-200 text-sm">Total Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1.2K</div>
            <div className="text-red-200 text-sm">Monthly Orders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.7</div>
            <div className="text-red-200 text-sm">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-red-200 text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;