import { Sandbox } from '@e2b/code-interpreter'
import { tool } from 'ai'
import { z } from 'zod'


export const generateCodeTool = tool({
  description: 'Install a package from the npm registry',
  parameters: z.object({
    sandboxId: z
      .string()
      .describe('Sandbox id to run the command in'),
    generatedCode: z
      .string()
      .describe('Code to generate and run in the sandbox'),
  }),
  execute: async ({ generatedCode, sandboxId }) => {
    console.log('Connecting to sandbox... ', sandboxId)
    try {
      const sandbox = await Sandbox.connect(sandboxId)
      console.log('uploading code... ')
      console.log(generatedCode)
      console.log('writing content to file pages/index.tsx')
      const { path } = await sandbox.files.write('./pages/index.tsx', generatedCode)
      if (!path) {
        return 'Failed to write file'
      }
      return `Success, access your preview at https://${sandbox.getHost(3000)}`
    } catch (error) {
      return `Failed to connect to sandbox: ${error}`
    }
  }
})
