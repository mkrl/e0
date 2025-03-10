'use client'

import {
  BotIcon
} from '@/components/icons'
import { useChat } from '@ai-sdk/react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Message } from '@/components/ui/Message'
import Image from 'next/image'


export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat({
      onError: () =>
        toast.error('You\'ve been rate limited, please try again later!')
    })

  const inputRef = useRef<HTMLInputElement | null>(null)

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
                <div
                  className="flex flex-row gap-2 px-4 w-full md:w-[500px] md:px-0">
                  <div
                    className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
                    <BotIcon/>
                  </div>
                  <div className="flex flex-col gap-1 text-zinc-400">
                    <div>hmm...</div>
                  </div>
                </div>
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

        <form
          className="flex flex-col gap-2 relative items-center"
          onSubmit={(event) => {
            handleSubmit(event)
          }}
        >
          <div
            className="flex items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px)] bg-zinc-100 dark:bg-zinc-700 rounded-full px-4 py-2">
            {/* Message Input */}
            <input
              ref={inputRef}
              className="bg-transparent flex-grow outline-none text-zinc-800 dark:text-zinc-300 placeholder-zinc-400"
              placeholder="Send a message..."
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}