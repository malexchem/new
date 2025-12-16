import { useState } from "react";

const SupportTab = ({ role }: { role: string }) => {
  // Dummy support data
  const supportTickets = [
    {
      id: "TKT-7841",
      subject: "Payment Processing Issue",
      category: "Payment",
      status: "Open",
      priority: "High",
      lastUpdate: "2024-01-15 14:30",
      created: "2024-01-15 10:15",
      messages: 3,
      assignedTo: "Support Team"
    },
    {
      id: "TKT-7842",
      subject: "Product Delivery Delay",
      category: "Delivery",
      status: "In Progress",
      priority: "Medium",
      lastUpdate: "2024-01-14 16:45",
      created: "2024-01-14 09:20",
      messages: 5,
      assignedTo: "Logistics Team"
    },
    {
      id: "TKT-7843",
      subject: "Account Verification Required",
      category: "Account",
      status: "Resolved",
      priority: "Low",
      lastUpdate: "2024-01-13 11:20",
      created: "2024-01-12 15:30",
      messages: 2,
      assignedTo: "Admin Team"
    },
    {
      id: "TKT-7844",
      subject: "Technical Issue with Platform",
      category: "Technical",
      status: "Closed",
      priority: "High",
      lastUpdate: "2024-01-12 08:15",
      created: "2024-01-11 14:00",
      messages: 8,
      assignedTo: "Tech Team"
    }
  ];

  const faqCategories = [
    {
      name: "Account & Registration",
      questions: [
        { question: "How do I verify my account?", answer: "Account verification requires submitting valid documentation..." },
        { question: "Can I change my account type?", answer: "Account type changes require admin approval..." },
        { question: "How to reset my password?", answer: "Use the 'Forgot Password' feature on the login page..." }
      ]
    },
    {
      name: "Payments & Billing",
      questions: [
        { question: "What payment methods are accepted?", answer: "We accept M-Pesa, bank transfers, and purchase orders..." },
        { question: "How are commission fees calculated?", answer: "Commission is 5% of the transaction value..." },
        { question: "When will I receive my payout?", answer: "Payouts are processed within 3-5 business days..." }
      ]
    },
    {
      name: "Orders & Delivery",
      questions: [
        { question: "How do I track my order?", answer: "Use the Orders tab to track real-time delivery status..." },
        { question: "What is the delivery timeframe?", answer: "Delivery typically takes 2-7 business days..." },
        { question: "Can I cancel an order?", answer: "Orders can be cancelled within 1 hour of placement..." }
      ]
    }
  ];

  const supportStats = [
    { label: "Open Tickets", value: "12", change: "-3" },
    { label: "Avg Response Time", value: "2.4h", change: "-0.5h" },
    { label: "Resolution Rate", value: "94%", change: "+2%" },
    { label: "Satisfaction Score", value: "4.8", change: "+0.1" }
  ];

  const statusColors = {
    Open: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Resolved: "bg-green-100 text-green-800 border-green-200",
    Closed: "bg-gray-100 text-gray-800 border-gray-200"
  };

  const priorityColors = {
    High: "text-red-600",
    Medium: "text-orange-600",
    Low: "text-green-600"
  };

  const [activeFaqCategory, setActiveFaqCategory] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "General",
    priority: "Medium",
    message: ""
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    alert("Support ticket submitted successfully!");
    setNewTicket({ subject: "", category: "General", priority: "Medium", message: "" });
  };

  return (
    <div className="space-y-6">
      {/* Support Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Support Center</h1>
            <p className="text-red-100 text-lg">We're here to help you succeed</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-4">
            <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              📞 Call Support
            </button>
            <button className="px-6 py-3 bg-red-800 text-white rounded-lg font-semibold hover:bg-red-900 transition-colors">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-red-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tickets Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 lg:mb-0">My Support Tickets</h2>
              <div className="flex gap-3">
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">
                  + New Ticket
                </button>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[ticket.status as keyof typeof statusColors]}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>#{ticket.id}</span>
                        <span>•</span>
                        <span>{ticket.category}</span>
                        <span>•</span>
                        <span className={`font-medium ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                          {ticket.priority} Priority
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>Last update: {ticket.lastUpdate}</div>
                      <div>{ticket.messages} messages</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Assigned to: <span className="font-medium">{ticket.assignedTo}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        View Details
                      </button>
                      {ticket.status === "Open" && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                          Add Message
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Ticket Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Support Ticket</h2>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      <option>General</option>
                      <option>Technical</option>
                      <option>Account</option>
                      <option>Payment</option>
                      <option>Delivery</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Please provide detailed information about your issue..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ & Resources Sidebar */}
        <div className="space-y-6">
          {/* Quick Help */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-red-50 rounded-lg text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                <span className="text-xl">📚</span>
                Platform Guide
              </button>
              <button className="w-full p-4 bg-red-50 rounded-lg text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                <span className="text-xl">🎥</span>
                Video Tutorials
              </button>
              <button className="w-full p-4 bg-red-50 rounded-lg text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                <span className="text-xl">📄</span>
                Documentation
              </button>
              <button className="w-full p-4 bg-red-50 rounded-lg text-red-700 font-semibold hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                <span className="text-xl">🔧</span>
                System Status
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2 mb-4">
              {faqCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveFaqCategory(index)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeFaqCategory === index
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {faqCategories[activeFaqCategory].questions.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full text-left p-4 font-medium text-gray-900 hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    {faq.question}
                    <span className={`transform transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="font-semibold mb-4">Contact Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <div className="font-medium">Phone Support</div>
                  <div className="text-red-200 text-sm">+254 700 123 456</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-red-200 text-sm">support@wested.co.ke</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🕒</span>
                <div>
                  <div className="font-medium">Support Hours</div>
                  <div className="text-red-200 text-sm">24/7 Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">Emergency Support</h3>
            <p className="text-yellow-700 text-sm mb-4">
              For critical platform issues affecting your business operations.
            </p>
            <button className="w-full py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
              🚨 Emergency Contact
            </button>
          </div>
        </div>
      </div>

      {/* Support Resources */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">📖</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-gray-600 text-sm">Comprehensive guides and tutorials</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">🎓</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Training</h3>
            <p className="text-gray-600 text-sm">Live training sessions and webinars</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">🔄</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Updates</h3>
            <p className="text-gray-600 text-sm">Platform updates and changelog</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">👥</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-sm">Connect with other users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;