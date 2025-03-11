import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createSandboxTool } from '@/tools/createSandbox'
import { installPackageTool } from '@/tools/installPackage'
import { generateCodeTool } from '@/tools/generateCode'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()


  const result = streamText({
    model: openai('gpt-4o-mini'),
    toolCallStreaming: true,
    tools: {
      createSandbox: createSandboxTool,
      generateCode: generateCodeTool,
      installPackage: installPackageTool
    },
    maxSteps: 5,
    system:
      `
      You are a highly-skilled software engineer assistant.
      You have access to a remote sandbox server where you can run code.
      Before generating any code, you first need to create a sandbox to run it.
      You can only use dependencies that are provided when you create a sandbox unless you install them yourself.
      Generate a Typescript Next.js app from the user prompt.
      You can generate multiple files if needed, but you MUST try your best to fit all the code in one file unless specifically asked to.
      Your first generated file should always be located in "./pages.index.tsx"
      Every code generation MUST include the full code, never a partial code snippet.
      Every generated code response should be a valid Next.js component in one file, exported as a default function.
      Only use the generateCode tool to write the code, never send the code as a message to the user.
      Use correct formatting and line breaks. Keep the code clean and readable.
      Do not forget to add export keyword to functions.
      If you are asked to create a new file, you muust update the last generated file to import and use the new file.
    `,
    messages
  })

  return result.toDataStreamResponse()
}
