import React from 'react'
import { motion } from 'framer-motion'


type ViewToggleProps = {
  showCode: boolean;
  onClick: () => void;
}

export const PreviewViewToggle: React.FC<ViewToggleProps> = ({ showCode, onClick }) => {
  return (
    <div
      className="flex items-center w-full rounded-full p-1 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="absolute h-8 rounded-full bg-primary shadow-sm"
        initial={false}
        animate={{
          x: showCode ? 4 : '100%',
          width: '48%'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      />
      <div className="relative flex w-full">
        <div className={`flex-1 flex justify-center py-1.5 text-sm font-medium z-10 transition-colors ${
          showCode
            ? 'text-white'
            : 'text-gray-50'
        }`}>
          Code
        </div>
        <div className={`flex-1 flex justify-center py-1.5 text-sm font-medium z-10 transition-colors ${
          !showCode
            ? 'text-white'
            : 'text-gray-50'
        }`}>
          Preview
        </div>
      </div>
    </div>
  );
};
