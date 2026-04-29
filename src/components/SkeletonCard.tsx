import React from 'react';

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ background: '#1A1228', border: '1px solid #2D2040' }}
    >
      <div className="h-44" style={{ background: '#2D2040' }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 rounded-full w-3/4" style={{ background: '#2D2040' }} />
        <div className="h-3 rounded-full w-1/2" style={{ background: '#2D2040' }} />
        <div className="h-3 rounded-full w-2/3" style={{ background: '#2D2040' }} />
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-8 rounded-lg" style={{ background: '#2D2040' }} />
          <div className="flex-1 h-8 rounded-lg" style={{ background: '#2D2040' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
