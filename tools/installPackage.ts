import { Sandbox } from '@e2b/code-interpreter'
import { tool } from 'ai'
import { z } from 'zod'


export const installPackageTool = tool({
  description: 'Install a package from the npm registry',
  parameters: z.object({
    packageName: z
      .string()
      .describe('Package name to install'),
    sandboxId: z
      .string()
      .describe('Sandbox id to run the command in'),
  }),
  execute: async ({ packageName, sandboxId }) => {
    console.log('Connecting to sandbox... ', sandboxId)
    try {
      const sandbox = await Sandbox.connect(sandboxId)
      console.log('installing package ', packageName)
      const {
        stdout, exitCode, stderr
      } = await sandbox.commands.run(`npm i ${packageName}`)
      if (exitCode !== 0) {
        return stderr
      }
      return stdout
    } catch (error) {
      return `Failed to connect to sandbox: ${error}`
    }
  }
})
