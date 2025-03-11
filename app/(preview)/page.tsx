'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Message } from '@/components/ui/Message'
import { ChatForm } from '@/components/ui/ChatForm'
import { Preview } from '@/components/ui/Preview'
import { useStore } from '@nanostores/react'
import { $generationStarted } from '@/stores/code'
import { E0Logo } from '@/components/icons'


export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, status } =
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