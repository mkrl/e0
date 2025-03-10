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
      className={`flex items-center h-9 px-3 rounded-t-md cursor-pointer border-t border-l border-r transition-colors
        max-w-[200px] relative group ${
        isActive
          ? 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700'
          : 'bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-850'
      }`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span
        className={`text-sm truncate mr-6 ${
          isActive
            ? 'text-gray-800 dark:text-white'
            : 'text-gray-600 dark:text-gray-400'
        }`}
        title={fileName}
      >
        {fileName}
      </span>
    </motion.div>
  )
}