import { useState } from "react";

const SchoolsTab = () => {
  // Dummy schools data
  const schools = [
    {
      id: 1,
      name: "Green Valley High School",
      type: "Secondary",
      level: "National",
      students: 1200,
      orders: 34,
      spent: 1250000,
      location: "Nairobi",
      emisCode: "EMIS-234567",
      contact: "principal@greenvalley.sc.ke",
      specialties: ["Science", "Sports", "Arts"],
      joinDate: "2023-05-15",
      rating: 4.8,
      image: "🏫"
    },
    {
      id: 2,
      name: "Sunrise Primary School",
      type: "Primary",
      level: "County",
      students: 800,
      orders: 23,
      spent: 780000,
      location: "Mombasa",
      emisCode: "EMIS-345678",
      contact: "info@sunriseprimary.sc.ke",
      specialties: ["CBC", "Music", "Swimming"],
      joinDate: "2023-08-22",
      rating: 4.6,
      image: "🏫"
    },
    {
      id: 3,
      name: "Mountain View Academy",
      type: "Secondary",
      level: "Extra County",
      students: 950,
      orders: 45,
      spent: 1560000,
      location: "Nakuru",
      emisCode: "EMIS-456789",
      contact: "admin@mountainview.sc.ke",
      specialties: ["STEM", "Robotics", "Debate"],
      joinDate: "2023-11-30",
      rating: 4.9,
      image: "🏫"
    },
    {
      id: 4,
      name: "Riverside Secondary",
      type: "Secondary",
      level: "National",
      students: 1100,
      orders: 28,
      spent: 890000,
      location: "Kisumu",
      emisCode: "EMIS-567890",
      contact: "contact@riverside.sc.ke",
      specialties: ["Agriculture", "Business", "Languages"],
      joinDate: "2023-07-12",
      rating: 4.4,
      image: "🏫"
    },
    {
      id: 5,
      name: "Central Primary School",
      type: "Primary",
      level: "Sub-County",
      students: 600,
      orders: 19,
      spent: 450000,
      location: "Eldoret",
      emisCode: "EMIS-678901",
      contact: "info@centralprimary.sc.ke",
      specialties: ["Special Needs", "ICT", "Games"],
      joinDate: "2023-04-18",
      rating: 4.7,
      image: "🏫"
    },
    {
      id: 6,
      name: "Hope Academy",
      type: "Secondary",
      level: "County",
      students: 700,
      orders: 31,
      spent: 670000,
      location: "Thika",
      emisCode: "EMIS-789012",
      contact: "hopeacademy@school.sc.ke",
      specialties: ["Technical", "Home Science", "Clubs"],
      joinDate: "2023-09-05",
      rating: 4.5,
      image: "🏫"
    }
  ];

  const types = ["All Types", "Primary", "Secondary"];
  const levels = ["All Levels", "National", "Extra County", "County", "Sub-County"];
  const locations = ["All Locations", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"];
  
  const stats = [
    { label: "Total Schools", value: "892", change: "+15%" },
    { label: "Active Schools", value: "756", change: "+8%" },
    { label: "Total Spending", value: "KSh 245M", change: "+23%" },
    { label: "Avg Rating", value: "4.6", change: "+0.2" }
  ];

  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("spent");

  const filteredSchools = schools.filter(school => {
    const matchesType = selectedType === "All Types" || school.type === selectedType;
    const matchesLevel = selectedLevel === "All Levels" || school.level === selectedLevel;
    const matchesLocation = selectedLocation === "All Locations" || school.location === selectedLocation;
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesLevel && matchesLocation && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "spent": return b.spent - a.spent;
      case "students": return b.students - a.students;
      case "orders": return b.orders - a.orders;
      case "rating": return b.rating - a.rating;
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
                placeholder="Search schools, specialties..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Type Filter */}
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
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
              <option value="spent">Sort by: Spending</option>
              <option value="students">Sort by: Students</option>
              <option value="orders">Sort by: Orders</option>
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{school.image}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {school.name}
                    </h3>
                    <p className="text-gray-600 text-sm capitalize">{school.type} • {school.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-900">{school.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">EMIS: {school.emisCode}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{school.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium text-gray-900">{school.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-medium text-gray-900">{school.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-bold text-red-600">KSh {school.spent.toLocaleString()}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {school.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Contact:</p>
                <p className="text-sm text-gray-600 truncate">{school.contact}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Send Catalog
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">School Network Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">892</div>
            <div className="text-red-200 text-sm">Registered Schools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">245K</div>
            <div className="text-red-200 text-sm">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">KSh 245M</div>
            <div className="text-red-200 text-sm">Total Spending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.6</div>
            <div className="text-red-200 text-sm">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolsTab;