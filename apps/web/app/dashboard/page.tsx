'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export default function DashboardPage() {
  const { data: loads } = useQuery({
    queryKey: ['loads'],
    queryFn: () => api.get('/loads').then((res) => res.data),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => api.get('/customers').then((res) => res.data),
  });

  const { data: carriers } = useQuery({
    queryKey: ['carriers'],
    queryFn: () => api.get('/carriers').then((res) => res.data),
  });

  const { data: invoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => api.get('/invoices').then((res) => res.data),
  });

  const stats = [
    { name: 'Total Loads', value: loads?.length || 0, color: 'bg-blue-500' },
    { name: 'Customers', value: customers?.length || 0, color: 'bg-green-500' },
    { name: 'Carriers', value: carriers?.length || 0, color: 'bg-yellow-500' },
    { name: 'Pending Invoices', value: invoices?.filter((i: any) => i.status !== 'PAID').length || 0, color: 'bg-red-500' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md ${stat.color} p-3`}>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Recent Loads</h3>
          {loads?.slice(0, 5).map((load: any) => (
            <div key={load.id} className="flex items-center justify-between border-b py-3 last:border-0">
              <div>
                <p className="font-medium">{load.loadNumber}</p>
                <p className="text-sm text-gray-500">{load.originCity} → {load.destCity}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                load.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                load.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {load.status}
              </span>
            </div>
          )) || <p className="text-gray-500">No loads yet</p>}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Pending Invoices</h3>
          {invoices?.filter((i: any) => i.status !== 'PAID').slice(0, 5).map((invoice: any) => (
            <div key={invoice.id} className="flex items-center justify-between border-b py-3 last:border-0">
              <div>
                <p className="font-medium">{invoice.invoiceNumber}</p>
                <p className="text-sm text-gray-500">{invoice.customer?.name}</p>
              </div>
              <span className="font-semibold text-gray-900">${invoice.amount}</span>
            </div>
          )) || <p className="text-gray-500">No pending invoices</p>}
        </div>
      </div>
    </div>
  );
}
