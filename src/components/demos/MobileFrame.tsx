import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
  title?: string;
}

export function MobileFrame({ children, title }: MobileFrameProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
      {/* Phone Shell */}
      <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-700/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 flex justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
        </div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-white text-slate-900 overflow-y-auto overflow-x-hidden pt-8 pb-4 relative">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-200 rounded-full z-50"></div>
      </div>
      
      {title && (
        <p className="mt-8 text-slate-500 font-mono text-sm uppercase tracking-widest">{title} <span className="opacity-50">{'//'}</span> Mobile Interface</p>
      )}
    </div>
  );
}
