import React from 'react';
import { Activity, Server, Users, AlertTriangle, CheckCircle, Clock, FileText, ShieldCheck } from 'lucide-react';
import { MOCK_INTERFACES } from '../mockData';
import { InterfaceStatus } from '../types';

interface KpiCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: any;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
  </div>
);

const InterfaceRow: React.FC<{ item: InterfaceStatus }> = ({ item }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-4">
      <div className={`w-2 h-2 rounded-full ${
        item.status === 'Operational' ? 'bg-green-500' : 
        item.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
      }`}></div>
      <div>
        <p className="text-sm font-medium text-gray-900">{item.name}</p>
        <p className="text-xs text-gray-500">{item.type} Interface</p>
      </div>
    </div>
    <div className="flex items-center space-x-6">
      <div className="flex items-center text-xs text-gray-500">
        <Clock size={12} className="mr-1" />
        {item.latency}ms
      </div>
      <div className="text-xs text-gray-400">
        Synced: {item.lastSync}
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
        item.status === 'Operational' ? 'bg-green-100 text-green-700' : 
        item.status === 'Degraded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
      }`}>
        {item.status}
      </span>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="System Uptime (SLA)" 
          value="99.98%" 
          subtext="Target: 99.9%" 
          icon={Activity} 
          color="green" 
        />
        <KpiCard 
          title="Active Students" 
          value="14,203" 
          subtext="Updated 5 mins ago" 
          icon={Users} 
          color="blue" 
        />
        <KpiCard 
          title="Pending Applications" 
          value="482" 
          subtext="JAE/DAE Intake" 
          icon={FileText} 
          color="indigo" 
        />
        <KpiCard 
          title="Security Incidents" 
          value="0" 
          subtext="Last 24 Hours" 
          icon={ShieldCheck} 
          color="emerald" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interface Health */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Server size={18} className="mr-2 text-tp-red" />
              Interface Health Status
            </h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Part 2 Sec C</span>
          </div>
          <div>
            {MOCK_INTERFACES.map((item, idx) => (
              <InterfaceRow key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle size={18} className="mr-2 text-yellow-500" />
            System Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border border-yellow-100 rounded text-sm text-yellow-800">
              <span className="font-bold block mb-1">Maintenance Window</span>
              Scheduled maintenance for Workday Finance interface on Sunday 02:00 AM.
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-800">
              <span className="font-bold block mb-1">Enrolment Surge</span>
              High traffic expected on 15 Oct due to JAE posting release. Scalability rules active.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
