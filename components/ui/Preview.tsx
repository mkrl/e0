'use client'

import { useStore } from '@nanostores/react'
import {
  $codePreview,
  $codeStore,
  $generationFinished,
  $activeFile,
  setActiveFile
} from '@/stores/code'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { $previewLink } from '@/stores/preview'
import Editor from '@monaco-editor/react'
import { CodeTab } from '@/components/ui/CodeTab'

export const Preview = () => {
  const code = useStore($codeStore)
  const codePreview = useStore($codePreview)
  const activeFile = useStore($activeFile)
  const generationFinished = useStore($generationFinished)
  const previewLink = useStore($previewLink)

  const [showCode, setShowCode] = useState(true)

  const codeDisplayedOnce = useRef(false)



  useEffect(() => {
    if (generationFinished && !codeDisplayedOnce.current) {
      setShowCode(false)
      codeDisplayedOnce.current = true
    }
  }, [generationFinished])

  useEffect(() => {
    if (activeFile) {
      setActiveFile(activeFile)
    }
  }, [activeFile])

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
          onClick={() => {
            setShowCode(!showCode)
            codeDisplayedOnce.current = false
          }}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      {showCode ? (
        <div className="flex flex-col h-full">
          <div className="h-auto flex flex-row items-start justify-start">
            {
              Object.keys(code).map(file => (
                <CodeTab
                  fileName={file} key={file}
                  isActive={activeFile === file}
                  onClick={() => setActiveFile(file)}
                />
              ))
            }
          </div>
          <Editor
            className="h-full"
            value={activeFile && code[activeFile] ? code[activeFile] : codePreview}
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
        </div>
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