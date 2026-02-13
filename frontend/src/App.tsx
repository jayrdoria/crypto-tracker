import React from 'react';
import CryptoList from './components/CryptoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Crypto Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live cryptocurrency prices &mdash; auto-refreshes every 30s
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <CryptoList />
      </main>
    </div>
  );
}

export default App;
