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
import Image from 'next/image'

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
      return <Spinner color="#ff8800"/>
    case 'result':
      return <p>Deployed <code>{part.toolInvocation?.args?.filePath}</code></p>
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
    'result': 'Created e2b sandbox'
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

const TOOL_CALL_LOGO: Record<ToolNameType, string> = {
  'createSandbox': '/e2blogo.svg',
  'generateCode': '/codelogo.svg',
  'installPackage': '/packagelogo.svg'
}

export const ToolCall = ({ part }: ToolCallProps) => {

  const toolName = part.toolInvocation.toolName as ToolNameType

  const Component = TOOL_CALL_COMPONENTS[toolName]

  return (
    <motion.div
      className="rounded-lg min-w-[29rem] border dark:border-gray-800 flex flex-col gap-4 text-zinc-600 text-sm dark:text-zinc-400 overflow-hidden bg-gray-50 dark:bg-gray-800"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className='flex flex-row h-[64px] gap-2'>
        <Image className='rounded' src={TOOL_CALL_LOGO[toolName]} alt='Tool call icon' width={64} height={64}/>
        <div className='flex flex-col justify-center p-2'>
          <h3
            className="font-bold mb-1">{TOOL_CALL_TITLES[toolName][part.toolInvocation.state]}</h3>
          <Component part={part}/>
        </div>
      </div>
    </motion.div>
  )
}