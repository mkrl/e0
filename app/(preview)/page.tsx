'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Message } from '@/components/ui/Message'
import { ChatForm } from '@/components/ui/ChatForm'
import { Preview } from '@/components/ui/Preview'
import { useStore } from '@nanostores/react'
import { $generationStarted, resetCode } from '@/stores/code'
import { E0Logo, RestartIcon } from '@/components/icons'
import { unstable_noStore as noStore } from 'next/cache';


export default function Home() {
  noStore()
  const { messages, input, handleSubmit, handleInputChange, status, setMessages } =
    useChat({
      onError: () =>
        toast.error('You\'ve been rate limited, please try again later!')
    })

  const hasCode = useStore($generationStarted)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div
      className="flex flex-row justify-center h-dvh"
    >
      <div className="flex flex-col justify-between gap-4 w-1/2 items-center">
        {messages.length > 0 ? (
          <>
            <button
              className="absolute left-6 top-6 text-zinc-400 p-2 hover:animate-rotate"
              onClick={() => {
                setMessages([])
                resetCode()
              }}
              title="Start over"
            >
              <RestartIcon />
            </button>
            <section
              className="flex flex-col gap-4 h-full w-full items-center overflow-y-auto">
              {messages.map((message, index) => (
                <Message message={message} index={index} key={message.id}/>
              ))}

              {status === 'submitted' &&
                messages[messages.length - 1].role !== 'assistant' && (
                  <Message loading message={{
                    role: 'assistant', content: 'Thinking...', id: 'dummy', parts: []
                  }}/>
                )}

              <div ref={messagesEndRef}/>
            </section>
          </>
        ) : (
          <motion.div
            className="h-[350px] px-4 w-full md:w-[500px] md:px-0 pt-40 flex flex-col content-center items-center gap-8 flex-grow">
            <E0Logo/>
            <div
              className="flex flex-col gap-4 text-lg">
              <p className="text-center">
                Securely generate and run apps powered by a variety of LLMs and
                E2B infrastructure.
              </p>
            </div>
          </motion.div>
        )}

        <ChatForm
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
          hasMessages={messages.length > 0}
        />
      </div>
      {hasCode && <Preview />}
    </div>
  )
}

export const dynamic = 'force-dynamic'
