'use client';

import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Welcome back</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <UserCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}
