import { useState } from "react";

const SuppliersTab = () => {
  // Dummy suppliers data
  const suppliers = [
    {
      id: 1,
      name: "EduLab Kenya",
      category: "Lab Equipment",
      rating: 4.8,
      reviews: 142,
      products: 47,
      completedOrders: 128,
      responseTime: "2 hours",
      location: "Nairobi",
      specialties: ["Science Kits", "Lab Equipment", "Chemistry"],
      certification: ["KEBS", "MOE Certified"],
      joinDate: "2023-05-15",
      image: "🔬"
    },
    {
      id: 2,
      name: "SportPro Kenya",
      category: "Sports Equipment",
      rating: 4.6,
      reviews: 89,
      products: 23,
      completedOrders: 67,
      responseTime: "4 hours",
      location: "Mombasa",
      specialties: ["Sports Gear", "Team Equipment", "Training"],
      certification: ["KEBS", "Sports Board"],
      joinDate: "2023-08-22",
      image: "⚽"
    },
    {
      id: 3,
      name: "TechEdu Solutions",
      category: "Technology",
      rating: 4.9,
      reviews: 56,
      products: 15,
      completedOrders: 34,
      responseTime: "1 hour",
      location: "Nairobi",
      specialties: ["Computers", "ICT Labs", "Software"],
      certification: ["KEBS", "ICT Authority"],
      joinDate: "2023-11-30",
      image: "💻"
    },
    {
      id: 4,
      name: "Curriculum Masters",
      category: "Learning Materials",
      rating: 4.4,
      reviews: 78,
      products: 34,
      completedOrders: 95,
      responseTime: "6 hours",
      location: "Kisumu",
      specialties: ["CBC Materials", "Textbooks", "Learning Aids"],
      certification: ["MOE Certified"],
      joinDate: "2023-07-12",
      image: "📚"
    },
    {
      id: 5,
      name: "Uniform Masters",
      category: "Apparel",
      rating: 4.7,
      reviews: 156,
      products: 12,
      completedOrders: 234,
      responseTime: "3 hours",
      location: "Nakuru",
      specialties: ["School Uniforms", "Sports Wear", "Accessories"],
      certification: ["KEBS"],
      joinDate: "2023-04-18",
      image: "👕"
    },
    {
      id: 6,
      name: "Math Wizards",
      category: "Curriculum",
      rating: 4.5,
      reviews: 67,
      products: 28,
      completedOrders: 89,
      responseTime: "5 hours",
      location: "Eldoret",
      specialties: ["Mathematics Kits", "Calculators", "Learning Tools"],
      certification: ["MOE Certified"],
      joinDate: "2023-09-05",
      image: "🧮"
    }
  ];

  const categories = ["All", "Lab Equipment", "Sports Equipment", "Technology", "Learning Materials", "Apparel", "Curriculum"];
  const locations = ["All Locations", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];
  
  const stats = [
    { label: "Total Suppliers", value: "247", change: "+12%" },
    { label: "Categories", value: "18", change: "+3" },
    { label: "Avg Rating", value: "4.7", change: "+0.1" },
    { label: "Active Today", value: "89", change: "+8" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = selectedCategory === "All" || supplier.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || supplier.location === selectedLocation;
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesLocation && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating": return b.rating - a.rating;
      case "orders": return b.completedOrders - a.completedOrders;
      case "reviews": return b.reviews - a.reviews;
      case "name": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

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
          {/* Search */}
          <div className="w-full lg:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search suppliers, specialties..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Sort By */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="orders">Sort by: Orders</option>
              <option value="reviews">Sort by: Reviews</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{supplier.image}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {supplier.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{supplier.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-900">{supplier.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({supplier.reviews} reviews)</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{supplier.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium text-green-600">{supplier.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed Orders:</span>
                  <span className="font-medium text-gray-900">{supplier.completedOrders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-medium text-gray-900">{supplier.products}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.certification.map((cert, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Supplier Network Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">247</div>
            <div className="text-red-200 text-sm">Verified Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-red-200 text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.7</div>
            <div className="text-red-200 text-sm">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24h</div>
            <div className="text-red-200 text-sm">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersTab;