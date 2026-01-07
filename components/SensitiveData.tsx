import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface SensitiveDataProps {
  value: string;
  label?: string;
  isEncrypted?: boolean;
}

export const SensitiveData: React.FC<SensitiveDataProps> = ({ value, label, isEncrypted = false }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    if (!isRevealed) {
      console.log(`[AUDIT LOG] User unmasked data for: ${label || 'Unknown Field'} at ${new Date().toISOString()}`);
    }
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="flex flex-col">
      {label && <span className="text-xs text-gray-500 mb-1">{label}</span>}
      <div className="flex items-center space-x-2 group">
        <div className={`
          relative flex items-center px-3 py-1.5 rounded border 
          ${isRevealed ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}
          transition-colors duration-200
        `}>
          {isEncrypted && (
            <div className="mr-2 text-green-600" title="Field-Level Encryption (AES-256) Active">
              <Lock size={12} />
            </div>
          )}
          <span className={`font-mono text-sm ${isRevealed ? 'text-gray-900' : 'text-gray-400'}`}>
            {isRevealed ? value : '•••• •••• ••••'}
          </span>
        </div>
        <button 
          onClick={toggleReveal}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title={isRevealed ? "Mask Data" : "Unmask Data (Logged)"}
        >
          {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};
