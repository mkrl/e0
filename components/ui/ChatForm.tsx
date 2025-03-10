import { ChangeEvent, FormEvent } from 'react'

type ChatFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  input: string
  handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}

export const ChatForm = ({ handleSubmit, input, handleInputChange }: ChatFormProps) => (
  <form
    className="flex flex-col gap-2 relative items-center pb-20 w-full"
    onSubmit={(event) => {
      handleSubmit(event)
    }}
  >
    <div
      className="flex items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px)] bg-zinc-100 dark:bg-zinc-700 rounded-full px-4 py-2">
      {/* Message Input */}
      <input
        className="bg-transparent flex-grow outline-none text-zinc-800 dark:text-zinc-300 placeholder-zinc-400"
        placeholder="Send a message..."
        value={input}
        onChange={handleInputChange}
      />
    </div>
  </form>
)
