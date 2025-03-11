import React from 'react'
import { motion } from 'framer-motion'

interface CodeTabProps {
  fileName: string;
  isActive: boolean;
  onClick: () => void
}

export const CodeTab: React.FC<CodeTabProps> = ({
    fileName,
    isActive,
    onClick
  }) => {
  return (
    <motion.div
      className={`flex items-center h-9 px-3 rounded-t-md cursor-pointer transition-colors
        max-w-[200px] relative group ${
        isActive
          ? 'bg-zinc-800'
          : 'bg-zinc-900 hover:bg-zinc-850'
      }`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span
        className={`text-sm truncate mr-6 ${
          isActive
            ? 'text-white'
            : 'text-gray-400'
        }`}
        title={fileName}
      >
        {fileName}
      </span>
    </motion.div>
  )
}