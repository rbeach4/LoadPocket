'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../../../lib/api';

export default function CarriersPage() {
  const queryClient = useQueryClient();

  const { data: carriers, isLoading } = useQuery({
    queryKey: ['carriers'],
    queryFn: () => api.get('/carriers').then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/carriers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['carriers'] }),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Carriers</h1>
        <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <PlusIcon className="mr-2 h-5 w-5" />
          New Carrier
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                MC / DOT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Insurance Exp
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {carriers?.map((carrier: any) => (
              <tr key={carrier.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-gray-900">{carrier.name}</div>
                  <div className="text-sm text-gray-500">{carrier.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{carrier.mcNumber}</div>
                  <div className="text-sm text-gray-500">{carrier.dotNumber}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{carrier.contactName}</div>
                  <div className="text-sm text-gray-500">{carrier.phone}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {carrier.insuranceExp
                    ? new Date(carrier.insuranceExp).toLocaleDateString()
                    : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button className="mr-3 text-blue-600 hover:text-blue-900">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(carrier.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
