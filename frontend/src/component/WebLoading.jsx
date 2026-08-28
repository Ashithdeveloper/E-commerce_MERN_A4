import React from 'react';

const WebLoading = ({ message = "Loading store..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 select-none">
      
      {/* Brand Icon with Spinner Glow */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer Spinning Ring */}
        <div className="w-20 h-20 rounded-2xl border-2 border-gray-200 border-t-black animate-spin" />
        
        {/* Inner Pulsing Brand Icon */}
        <div className="absolute inset-0 m-auto w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg animate-pulse">
          A4
        </div>
      </div>

      {/* Brand Name */}
      <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">
        A4 <span className="text-gray-400 font-light">FashionStore</span>
      </h2>

      {/* Loading Status Message */}
      <p className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-1.5 mt-1">
        <span>{message}</span>
        <span className="flex gap-1 items-center">
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
        </span>
      </p>

      {/* Subtle Progress Bar */}
      <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-5">
        <div className="w-full h-full bg-black/80 rounded-full animate-pulse origin-left"></div>
      </div>

    </div>
  );
};

export default WebLoading;