'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '../../../lib/api';

interface LoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  load?: any;
}

export function LoadModal({ isOpen, onClose, load }: LoadModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: load || {},
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => api.get('/customers').then((res) => res.data),
  });

  const { data: carriers } = useQuery({
    queryKey: ['carriers'],
    queryFn: () => api.get('/carriers').then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/loads', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loads'] });
      onClose();
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/loads/${load?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loads'] });
      onClose();
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      customerRate: parseFloat(data.customerRate),
      carrierRate: parseFloat(data.carrierRate),
      weight: data.weight ? parseFloat(data.weight) : null,
      pieces: data.pieces ? parseInt(data.pieces) : null,
    };

    if (load) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    {load ? 'Edit Load' : 'New Load'}
                  </Dialog.Title>
                  <button onClick={onClose}>
                    <XMarkIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Customer</label>
                      <select
                        {...register('customerId', { required: true })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select customer</option>
                        {customers?.map((c: any) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Carrier</label>
                      <select
                        {...register('carrierId')}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select carrier</option>
                        {carriers?.map((c: any) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Origin</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        {...register('originAddress', { required: true })}
                        placeholder="Address"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('originCity', { required: true })}
                        placeholder="City"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('originState', { required: true })}
                        placeholder="State"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('originZip', { required: true })}
                        placeholder="Zip"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Destination</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        {...register('destAddress', { required: true })}
                        placeholder="Address"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('destCity', { required: true })}
                        placeholder="City"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('destState', { required: true })}
                        placeholder="State"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('destZip', { required: true })}
                        placeholder="Zip"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Rates</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Customer Rate</label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('customerRate', { required: true })}
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Carrier Rate</label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('carrierRate', { required: true })}
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Details</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        {...register('weight')}
                        placeholder="Weight (lbs)"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        type="number"
                        {...register('pieces')}
                        placeholder="Pieces"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        {...register('equipment')}
                        placeholder="Equipment"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <input
                      {...register('commodity')}
                      placeholder="Commodity"
                      className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <textarea
                      {...register('notes')}
                      placeholder="Notes"
                      rows={3}
                      className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      {load ? 'Update' : 'Create'} Load
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
