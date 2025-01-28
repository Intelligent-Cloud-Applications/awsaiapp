import React from 'react';
import { Card } from 'flowbite-react';
import { FiTrendingUp, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';

const ClientHome = () => {
  return (
    <div className="flex-1 lg:ml-64 p-4">
      <div className="flex flex-col min-h-screen">
        {/* Main Container */}
        <div className="flex-1 max-w-[1920px] mx-auto w-full space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor your performance and analytics
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">$24,500</h3>
                    <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg">
                    <FiTrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">1,234</h3>
                    <p className="text-sm text-green-600 mt-1">+3% from last month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">845</h3>
                    <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">23</h3>
                    <p className="text-sm text-yellow-600 mt-1">5 due today</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <FiClock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Growth Chart */}
            <Card className="xl:col-span-2 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Growth Analytics</h3>
                </div>
                <select className="text-sm border-gray-200 rounded-lg focus:ring-cyan-500 focus:border-cyan-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Chart Component will be rendered here
              </div>
            </Card>

            {/* Member Activity */}
            <Card className="hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-cyan-600 hover:text-cyan-700">View all</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New member joined</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;