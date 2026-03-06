import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
const MESSAGES = [
'Scanning 240 projects',
'Filtering by your category',
'Checking role availability',
'Analyzing working style fit',
'Calculating match scores'];

export function ScanningStatus() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 400); // Wait for fade out before changing text
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#0a0a0b] border border-[#27272a] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
      {/* Techy background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />


      {/* Animated scanline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-[scan_3s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-8">
          {/* Outer glowing ring */}
          <div className="absolute inset-[-10px] border border-blue-500/30 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
          {/* Spinning dashed ring */}
          <div className="absolute inset-0 border-2 border-blue-500/40 rounded-full border-dashed animate-[spin_4s_linear_infinite]" />
          {/* Fast spinning solid ring */}
          <div className="absolute inset-2 border-2 border-blue-400 rounded-full border-t-transparent animate-[spin_1s_linear_infinite]" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center text-blue-400">
            <Search size={28} className="animate-pulse" />
          </div>
        </div>

        <div className="h-8 flex items-center justify-center">
          <p
            className={`text-lg font-mono tracking-wide text-blue-400 transition-opacity duration-400 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{
              textShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
            }}>

            {MESSAGES[messageIndex]}
            <span className="animate-pulse">...</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(400px); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>);

}