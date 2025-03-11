import React from 'react';

type ViewToggleProps = {
  showCode: boolean;
  onClick: () => void;
}

export const PreviewViewToggle: React.FC<ViewToggleProps> = ({ showCode, onClick }) => {
  return (
    <div
      className="flex items-center w-full rounded-full p-1 cursor-pointer relative"
      onClick={onClick}
    >
      <div
        className={`absolute h-8 rounded-full bg-primary shadow-sm transition-all duration-300 ease-in-out ${
          showCode
            ? 'left-1 w-[48%]'
            : 'left-[51%] w-[48%]'
        }`}
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