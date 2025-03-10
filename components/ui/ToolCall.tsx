import { motion } from 'framer-motion'
import { ToolInvocationUIPart } from '@ai-sdk/ui-utils'
import React, { FunctionComponent, useEffect } from 'react'
import { ToolNameType } from '@/types/tools'
import {
  $codeStore,
  setCode, setCodePreview,
  setGenerationFinished,
  setGenerationStarted,
  setActiveFile
} from '@/stores/code'
import { Spinner } from '@/components/ui/Spinner'
import { setLink } from '@/stores/preview'

type ToolCallProps = {
  part: ToolInvocationUIPart
}

const CreateSandbox = ({ part }: ToolCallProps) => {
  useEffect(() => {
    if (part.toolInvocation.state === 'result') {
      setLink(part.toolInvocation?.result.sandboxLink ?? '')
    }
  }, [part.toolInvocation])

  switch (part.toolInvocation.state) {
    case 'partial-call':
      return <>Creating sandbox...</>
    case 'result':
      return <>{part.toolInvocation.result.sandboxLink}</>
  }
}
const InstallPackage = ({ part }: ToolCallProps) => {
  switch (part.toolInvocation.state) {
    case 'partial-call':
      return <>Installing package: {part.toolInvocation?.args?.packageName}</>
    case 'result':
      return <>Package {part.toolInvocation?.args?.packageName} installed
        successfully</>
  }
}
const GenerateCode = ({ part }: ToolCallProps) => {
  useEffect(() => {
    setGenerationStarted(true)
  }, [])

  useEffect(() => {
    setActiveFile(null)
    // Temporary code preview is required because it streamed together with the code
    setCodePreview(part.toolInvocation?.args?.generatedCode ?? '')
    setGenerationFinished(false)
  }, [part.toolInvocation?.args])

  useEffect(() => {
    if (part.toolInvocation.state === 'result') {
      setCode(
        part.toolInvocation?.args?.filePath,
        part.toolInvocation?.args?.generatedCode
      )
      // @ts-expect-error this is the intended way of removing the item from the store
      $codeStore.setKey('temp', undefined)
      setActiveFile(part.toolInvocation?.args?.filePath)
      setGenerationFinished(true)
    }
  }, [part.toolInvocation])

  switch (part.toolInvocation.state) {
    case 'partial-call':
      return <Spinner/>
    case 'result':
      return <>Generated and deployed <pre>{part.toolInvocation?.args?.filePath}</pre></>
  }
}

const TOOL_CALL_COMPONENTS: Record<ToolNameType, FunctionComponent<ToolCallProps>> = {
  'createSandbox': CreateSandbox,
  'generateCode': GenerateCode,
  'installPackage': InstallPackage
}
const TOOL_CALL_TITLES: Record<ToolNameType, Record<ToolInvocationUIPart['toolInvocation']['state'], string>> = {
  'createSandbox': {
    'partial-call': 'Creating sandbox...',
    'call': 'Creating sandbox...',
    'result': 'Sandbox created successfully'
  },
  'generateCode': {
    'partial-call': 'Generating code...',
    'call': 'Uploading code...',
    'result': 'Generated code'
  },
  'installPackage': {
    'partial-call': 'Installing package...',
    'call': 'Installing package...',
    'result': 'Package installed'
  }
}

export const ToolCall = ({ part }: ToolCallProps) => {

  const toolName = part.toolInvocation.toolName as ToolNameType

  const Component = TOOL_CALL_COMPONENTS[toolName]

  return (
    <motion.div
      className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h3
        className="font-bold mb-1">{TOOL_CALL_TITLES[toolName][part.toolInvocation.state]}</h3>
      <Component part={part}/>
    </motion.div>
  )
}