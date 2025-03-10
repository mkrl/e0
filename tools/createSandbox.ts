import { Sandbox } from '@e2b/code-interpreter'
import { tool } from 'ai'
import { z } from 'zod'
import { SANDBOX_TIMEOUT } from '@/constants/sandbox'


export const createSandboxTool = tool({
  description: 'Create a sandbox to run your code',
  parameters: z.object({}),
  execute: async () => {
    try {
      const sandbox = await Sandbox.create('nextjs-developer', {
        apiKey: process.env.E2B_KEY,
        accessToken: process.env.E2B_TOKEN,
        logger: console,
        timeoutMs: SANDBOX_TIMEOUT
      })
      const packageJsonString = await sandbox.files.read('./package.json')
      const packageJsonFile = JSON.parse(packageJsonString)

      return `Sandbox created with id: "${sandbox.sandboxId}". You can now use the following dependencies: ${Object.keys(packageJsonFile.dependencies).join(', ')}`
    } catch (e) {
      return `Failed to create sandbox: ${e}`
    }
  }
})
