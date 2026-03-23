import React from 'react';

const TechnicalData = ({ label, value, position }) => (
  <div className={`absolute ${position} p-8 z-50 pointer-events-none hidden md:block`}>
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#63031A]/60 font-mono">{label}</span>
      <span className="text-[11px] font-mono text-[#63031A] uppercase tracking-wider">{value}</span>
    </div>
  </div>
);

const ArchitecturalGrid = () => (
  <div className="absolute inset-0 z-10 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#63031A_1px,transparent_1px),linear-gradient(to_bottom,#63031A_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.15]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-px h-full bg-[#63031A]/30" />
      <div className="w-full h-px bg-[#63031A]/30" />
    </div>
  </div>
);

export { TechnicalData, ArchitecturalGrid };
