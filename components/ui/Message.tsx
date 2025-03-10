import { UIMessage } from 'ai'
import { BotIcon, UserIcon } from '@/components/icons'
import { Markdown } from '@/components/markdown'
import { motion } from 'framer-motion'
import { ToolCall } from '@/components/ui/ToolCall'


type MessageProps = {
  message: UIMessage
  index: number
}

export const Message = ({ message, index }: MessageProps) => {
  return (
    <motion.div
      key={message.id}
      className={`flex flex-row gap-2 px-4 w-full md:w-[500px] md:px-0 ${
        index === 0 ? 'pt-20' : ''
      }`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div
        className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
        {message.role === 'assistant' ? <BotIcon/> : <UserIcon/>}
      </div>

      <div className="flex flex-col gap-1">
        {message.parts.map(part => {
          if (part.type === 'tool-invocation') {
            return <ToolCall key={part.toolInvocation.toolCallId} part={part}/>
          }
        })}
        <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    </motion.div>
  )
}