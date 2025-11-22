"use client"
import React, { useState } from 'react';
import { ChevronLeft, Search, Download } from 'lucide-react';

export default function EmployeeReportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Employee data
  const [employees] = useState([
    {
      id: 1,
      name: 'Rahul Mishra',
      position: 'Training Officer',
      initials: 'RM',
      bgColor: 'bg-purple-700',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    },
    {
      id: 2,
      name: 'Anil Singh',
      position: 'Manager',
      initials: 'AS',
      bgColor: 'bg-purple-800',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    },
    {
      id: 3,
      name: 'Sneha Aggarwal',
      position: 'Training Officer',
      initials: 'SA',
      bgColor: 'bg-purple-700',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    },
    {
      id: 4,
      name: 'Jyoti Sharma',
      position: 'Sales Exec',
      initials: 'JS',
      bgColor: 'bg-purple-700',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    },
    {
      id: 5,
      name: 'Anita Sehgal',
      position: 'Sales person',
      initials: 'AS',
      bgColor: 'bg-purple-800',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    },
    {
      id: 6,
      name: 'Priya Mehta',
      position: 'Verifier',
      initials: 'PM',
      bgColor: 'bg-purple-700',
      status: 'Active',
      attendance: '97%',
      performance: '87%'
    }
  ]);

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleExportReport = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleEmployeeClick = (employeeId) => {
    if (typeof window !== 'undefined') {
      // Use window.location for more reliable navigation in production
      window.location.href = `/dashboard/hr-analysis/${employeeId}`;
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-linear-to-r from-purple-900 via-indigo-900 to-purple-900 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6 flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold">Employee Report</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Search Bar */}
        <div className="mb-8 lg:mb-10">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Search for employee by name or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 lg:py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 shadow-sm text-base lg:text-lg transition-all"
            />
          </div>
        </div>

        {/* Employee List */}
        <div className="max-w-5xl mx-auto space-y-4 lg:space-y-5">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                onClick={() => handleEmployeeClick(employee.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleEmployeeClick(employee.id);
                  }
                }}
                className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 lg:p-8 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-gray-100"
                aria-label={`View details for ${employee.name}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:gap-6">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`${employee.bgColor} w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl lg:text-2xl shrink-0 shadow-lg`}>
                      {employee.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 truncate mb-1">
                        {employee.name}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 truncate">
                        {employee.position}
                      </p>
                    </div>
                  </div>

                  {/* Status and Metrics */}
                  <div className="flex items-center gap-4 lg:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Status Badge */}
                    <div className="shrink-0">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-200">
                        {employee.status}
                      </span>
                    </div>

                    {/* Attendance */}
                    <div className="text-center shrink-0">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {employee.attendance}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500 mt-1">Attendance</div>
                    </div>

                    {/* Performance */}
                    <div className="text-center shrink-0">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {employee.performance}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500 mt-1">Performance</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600 text-lg lg:text-xl font-medium">No employees found</p>
              <p className="text-gray-500 text-sm lg:text-base mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        {filteredEmployees.length > 0 && (
          <div className="max-w-5xl mx-auto mt-10 p-6 lg:p-8 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 text-base lg:text-lg">
                  Total Employees: <span className="font-bold text-gray-900 text-xl lg:text-2xl ml-2">{filteredEmployees.length}</span>
                </p>
              </div>
              <button 
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-linear-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-xl transition-all font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={handleExportReport}
              >
                <Download size={20} />
                Export Report
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
