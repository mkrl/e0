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
      You have an access to a remote sandbox server where you can run code.
      Before generating any code, you need to create a sandbox to run it.
      Generate a Typescript Next.js component from the user prompt.
      Every generated code response should be a valid Next.js component in one file, exported as a default function.
      Only use the generateCode tool to write the code, never send the code as a message to the user.
      Use correct formatting and line breaks. Keep the code clean and readable.
    `,
    messages
  })

  return result.toDataStreamResponse()
}
