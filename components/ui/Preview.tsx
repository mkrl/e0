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
import { PreviewViewToggle } from '@/components/ui/PreviewViewToggle'
import { Spinner } from '@/components/ui/Spinner'

export const Preview = () => {
  const code = useStore($codeStore)
  const codePreview = useStore($codePreview)
  const activeFile = useStore($activeFile)
  const generationFinished = useStore($generationFinished)
  const previewLink = useStore($previewLink)

  const [showCode, setShowCode] = useState(true)
  const [frameLoading, setFrameLoading] = useState(true)

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
    <div className="h-full w-1/2 p-10">
      <motion.div
        className="flex flex-col relative bg-gray-800 h-full rounded-2xl overflow-hidden"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="p-2 w-full bg-gray-800 border-b border-gray-700">
          <PreviewViewToggle
            showCode={showCode}
            onClick={() => {
              setShowCode(!showCode)
              setFrameLoading(true)
              codeDisplayedOnce.current = false
            }}
          />
        </div>
        {showCode ? (
          <div className="flex flex-col h-full">
            <div
              className="h-auto flex flex-row items-start justify-start border-b border-gray-700">
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
              theme="vs-dark"
              beforeMount={(monaco) => {
                let options = monaco.languages.typescript.javascriptDefaults.getCompilerOptions()
                options.jsx = 2
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions(options)
                monaco?.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                  noSemanticValidation: true,
                  noSyntaxValidation: true,
                  onlyVisible: true
                })
              }}
              options={{
                readOnly: true,
                padding: { top: 20, bottom: 10 },
                minimap: { enabled: true, autohide: true }
              }}
            />
          </div>
        ) : (
          <>
            <iframe
              className="h-full w-full"
              sandbox="allow-forms allow-scripts allow-same-origin"
              loading="lazy"
              src={previewLink}
              onLoad={() => setFrameLoading(false)}
            />
            {frameLoading && (
              <Spinner
                className="absolute top-1/2 left-1/2"
                color="#ff8800"
                width={72}
                height={72}
              />
            )}
          </>
        )
        }
      </motion.div>
    </div>
  )
}