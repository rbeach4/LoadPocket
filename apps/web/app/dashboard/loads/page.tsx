'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import api from '../../../lib/api';
import { LoadModal } from './load-modal';

const statusColumns = [
  { key: 'QUOTED', label: 'Quoted', color: 'bg-gray-100' },
  { key: 'BOOKED', label: 'Booked', color: 'bg-blue-100' },
  { key: 'DISPATCHED', label: 'Dispatched', color: 'bg-yellow-100' },
  { key: 'IN_TRANSIT', label: 'In Transit', color: 'bg-purple-100' },
  { key: 'DELIVERED', label: 'Delivered', color: 'bg-green-100' },
  { key: 'INVOICED', label: 'Invoiced', color: 'bg-orange-100' },
];

export default function LoadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: loads, isLoading } = useQuery({
    queryKey: ['loads'],
    queryFn: () => api.get('/loads').then((res) => res.data),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/loads/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loads'] }),
  });

  const handleDragStart = (e: React.DragEvent, load: any) => {
    e.dataTransfer.setData('loadId', load.id);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const loadId = e.dataTransfer.getData('loadId');
    updateStatusMutation.mutate({ id: loadId, status });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Loads</h1>
        <button
          onClick={() => {
            setSelectedLoad(null);
            setIsModalOpen(true);
          }}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          New Load
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {statusColumns.map((column) => (
          <div
            key={column.key}
            className={`min-w-[280px] rounded-lg ${column.color} p-4`}
            onDrop={(e) => handleDrop(e, column.key)}
            onDragOver={handleDragOver}
          >
            <h3 className="mb-4 font-semibold text-gray-700">
              {column.label}
              <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs">
                {loads?.filter((l: any) => l.status === column.key).length || 0}
              </span>
            </h3>
            <div className="space-y-3">
              {loads
                ?.filter((load: any) => load.status === column.key)
                .map((load: any) => (
                  <div
                    key={load.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, load)}
                    onClick={() => {
                      setSelectedLoad(load);
                      setIsModalOpen(true);
                    }}
                    className="cursor-pointer rounded-lg bg-white p-4 shadow hover:shadow-md"
                  >
                    <p className="font-medium text-gray-900">{load.loadNumber}</p>
                    <p className="text-sm text-gray-600">
                      {load.originCity}, {load.originState} → {load.destCity}, {load.destState}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>{load.customer?.name}</span>
                      <span className="font-semibold text-green-600">
                        ${Number(load.margin).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <LoadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        load={selectedLoad}
      />
    </div>
  );
}
