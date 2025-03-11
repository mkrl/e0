import { ChangeEvent, FormEvent } from 'react'

type ChatFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  input: string
  handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  hasMessages?: boolean
}

export const ChatForm = ({ handleSubmit, input, handleInputChange, hasMessages }: ChatFormProps) => (
  <form
      className={`flex flex-col gap-2 relative items-center pb-10 w-full ${hasMessages ? "flex-grow-0" : "flex-grow"} transition-[flex]`}
    onSubmit={(event) => {
      handleSubmit(event)
    }}
  >
    <div
      className={`${hasMessages ? "" : "animate-attention-pulse"} flex items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px)] bg-zinc-100 dark:bg-gray-800 rounded-full px-4 py-2`}>
      {/* Message Input */}
      <input
        className="bg-transparent flex-grow outline-none text-zinc-800 dark:text-zinc-300 placeholder-zinc-400"
        placeholder={hasMessages ? "Let's iterate on this!" : 'What would you like to build today?'}
        value={input}
        onChange={handleInputChange}
      />
    </div>
  </form>
)
