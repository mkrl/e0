'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Message } from '@/components/ui/Message'
import Image from 'next/image'
import { ChatForm } from '@/components/ui/ChatForm'


export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat({
      onError: () =>
        toast.error('You\'ve been rate limited, please try again later!')
    })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div
      className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900"
    >
      <div className="flex flex-col justify-between gap-4">
        {messages.length > 0 ? (
          <div
            className="flex flex-col gap-2 h-full w-dvw items-center overflow-y-scroll">
            {messages.map((message, index) => (
              <Message message={message} index={index} key={message.id}/>
            ))}

            {status === 'submitted' &&
              messages[messages.length - 1].role !== 'assistant' && (
                <Message loading message={{
                  role: 'assistant', content: 'hmm...', id: 'dummy', parts: []
                }}/>
              )}

            <div ref={messagesEndRef}/>
          </div>
        ) : (
          <motion.div
            className="h-[350px] px-4 w-full md:w-[500px] md:px-0 pt-20 flex flex-col content-center items-center gap-8">
            <Image src={'/e0.svg'} alt={'e0 logo'} width={300} height={200}/>
            <div
              className="border rounded-lg p-6 flex flex-col gap-4 text-smdark:border-zinc-700">
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
        />
      </div>
    </div>
  )
}