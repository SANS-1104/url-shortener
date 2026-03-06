import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');

  // Mock data for charts
  const clicksOverTimeData = [
    { date: 'Feb 13', clicks: 245 },
    { date: 'Feb 14', clicks: 312 },
    { date: 'Feb 15', clicks: 289 },
    { date: 'Feb 16', clicks: 398 },
    { date: 'Feb 17', clicks: 445 },
    { date: 'Feb 18', clicks: 512 },
    { date: 'Feb 19', clicks: 478 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#8b5cf6' },
    { name: 'Tablet', value: 20, color: '#10b981' },
  ];

  const countryData = [
    { country: 'USA', clicks: 1245 },
    { country: 'UK', clicks: 892 },
    { country: 'Canada', clicks: 567 },
    { country: 'Germany', clicks: 445 },
    { country: 'France', clicks: 389 },
    { country: 'Other', clicks: 921 },
  ];

  const topUrls = [
    { shortUrl: 'lnk.sh/abc123', clicks: 3421, change: '+23%' },
    { shortUrl: 'lnk.sh/xyz789', clicks: 2156, change: '+18%' },
    { shortUrl: 'lnk.sh/mkt2026', clicks: 1892, change: '+45%' },
    { shortUrl: 'lnk.sh/prod99', clicks: 1456, change: '+12%' },
    { shortUrl: 'lnk.sh/def456', clicks: 1234, change: '-5%' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 border border-blue-200 rounded-lg">
                <Sparkles className="size-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">Live</span>
              </div>
            </div>
            <p className="text-gray-600">Track and analyze your link performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10 px-4 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="12months">Last 12 months</option>
            </select>
            <Button variant="outline" className="hover:bg-blue-50">
              <Calendar className="size-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900">12,459</p>
              <div className="flex items-center gap-1 mt-2 text-sm font-medium text-green-600">
                <ArrowUpRight className="size-4" />
                +23% from last period
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <p className="text-sm text-gray-600 mb-1">Avg. Click Rate</p>
              <p className="text-3xl font-bold text-gray-900">4.2%</p>
              <div className="flex items-center gap-1 mt-2 text-sm font-medium text-green-600">
                <ArrowUpRight className="size-4" />
                +0.8% from last period
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <p className="text-sm text-gray-600 mb-1">Top Location</p>
              <p className="text-3xl font-bold text-gray-900">USA</p>
              <p className="text-sm text-gray-600 mt-2">45% of total clicks</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <p className="text-sm text-gray-600 mb-1">Top Device</p>
              <p className="text-3xl font-bold text-gray-900">Desktop</p>
              <p className="text-sm text-gray-600 mt-2">48% of total clicks</p>
            </CardContent>
          </Card>
        </div>

        {/* Clicks Over Time */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="size-5 text-white" />
              </div>
              <div>
                <CardTitle>Clicks Over Time</CardTitle>
                <CardDescription>Daily click activity for your short URLs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clicksOverTimeData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgb(59 130 246 / 0.2)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  fill="url(#colorClicks)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Distribution and Country Clicks */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Device Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Clicks by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div 
                        className="size-4 rounded-full shadow-md" 
                        style={{ backgroundColor: device.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">{device.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Country Clicks */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Clicks by Country</CardTitle>
              <CardDescription>Geographic distribution of clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="country" 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #8b5cf6',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgb(139 92 246 / 0.2)'
                    }}
                  />
                  <Bar dataKey="clicks" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing URLs */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Top Performing URLs</CardTitle>
            <CardDescription>Your most clicked short URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUrls.map((url, index) => (
                <div 
                  key={url.shortUrl} 
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center size-12 rounded-xl font-bold text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                      'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600 group-hover:text-blue-700">{url.shortUrl}</p>
                      <p className="text-sm text-gray-600">{url.clicks.toLocaleString()} clicks</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    url.change.startsWith('+') ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm font-bold ${
                      url.change.startsWith('+') ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {url.change}
                    </span>
                    <TrendingUp className={`size-4 ${
                      url.change.startsWith('+') ? 'text-green-700' : 'text-red-700 rotate-90'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}