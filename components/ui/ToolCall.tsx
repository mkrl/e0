import { motion } from 'framer-motion'
import { ToolInvocationUIPart } from '@ai-sdk/ui-utils'
import React, { FunctionComponent } from 'react'
import { ToolNameType } from '@/types/tools'


type ToolCallProps = {
  part: ToolInvocationUIPart
}

const CreateSandbox = ({ part }: ToolCallProps) => {
  switch (part.toolInvocation.state) {
    case 'partial-call':
      return <>Creating sandbox...</>
    case 'result':
      return <>Sandbox created successfully</>
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
  switch (part.toolInvocation.state) {
    case 'partial-call':
      return <>{part.toolInvocation?.args?.generatedCode}</>
    case 'result':
      return <>Code is generated and deployed</>
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
      <h3 className="font-bold mb-1">{TOOL_CALL_TITLES[toolName][part.toolInvocation.state]}</h3>
      <Component part={part}/>
    </motion.div>
  )
}