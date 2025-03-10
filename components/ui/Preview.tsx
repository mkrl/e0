'use client'

import { useStore } from '@nanostores/react'
import { $code, $generationFinished } from '@/stores/code'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { $previewLink } from '@/stores/preview'
import Editor from '@monaco-editor/react'

export const Preview = () => {
  const [showCode, setShowCode] = useState(true)

  const code = useStore($code)
  const generationFinished = useStore($generationFinished)
  const previewLink = useStore($previewLink)

  useEffect(() => {
    if (generationFinished) {
      setShowCode(false)
    }
  }, [generationFinished])

  return (
    <motion.div
      className="flex flex-col bg-gray-300 h-full w-1/2"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h2 className="text-lg font-bold">Preview</h2>
        <button
          className="text-xs text-gray-500"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      {showCode ? (
        <Editor
          className="h-full"
          value={code}
          defaultLanguage="typescript"
          path="index.tsx"
          beforeMount={(monaco) => {
            monaco?.languages.typescript.typescriptDefaults.setCompilerOptions({
              // This stands for JSX = React
              jsx: 2
            })

            monaco?.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: true,
              onlyVisible: true
            })
          }}
          options={{
            readOnly: true,
            minimap: { enabled: true, autohide: true }
          }}
        />
      ) : (
        <iframe
          className="h-full w-full"
          sandbox="allow-forms allow-scripts allow-same-origin"
          loading="lazy"
          src={previewLink}
        />
      )
      }

    </motion.div>
  )
}