import { Sandbox } from '@e2b/code-interpreter'
import { tool } from 'ai'
import { z } from 'zod'
import { SANDBOX_TIMEOUT } from '@/constants/sandbox'


export const generateCodeTool = tool({
  description: 'Install a package from the npm registry',
  parameters: z.object({
    sandboxId: z
      .string()
      .describe('Sandbox id to run the command in'),
    generatedCode: z
      .string()
      .describe('Code to generate and run in the sandbox'),
    filePath: z
      .string()
      .describe('Path for the file to write the code to'),
  }),
  execute: async ({ generatedCode, sandboxId, filePath }) => {
    console.log('Connecting to sandbox... ', sandboxId)
    try {
      const sandbox = await Sandbox.connect(sandboxId, {
        apiKey: process.env.E2B_KEY,
        accessToken: process.env.E2B_TOKEN,
        logger: console
      })
      await sandbox.setTimeout(SANDBOX_TIMEOUT)
      console.log('uploading code... ')
      console.log(generatedCode)
      console.log(`writing content to file ${filePath}`)
      const { path } = await sandbox.files.write(filePath, generatedCode)
      if (!path) {
        return 'Failed to write file'
      }
      return `Code written to ${path} and deployed`
    } catch (error) {
      return `Failed to connect to sandbox: ${error}`
    }
  }
})
