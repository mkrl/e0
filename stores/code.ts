import { atom, map, computed } from 'nanostores'

// A mapping of file paths to their code, e.g. { 'path/to/file.ts': 'console.log("Hello, world!")' }
type CodeFiles = {
  [key: string]: string
}

export const $codeStore = map<CodeFiles>({})
export const $codePreview = atom<string>('')
export const $generationFinished = atom<boolean>(false)
export const $generationStarted = atom<boolean>(false)
export const $activeFile = atom<string | null>(null)

export const $hasCode = computed($codeStore, code => code.keys.length > 0)

export const setCode = (filePath: string, code: string) => {
  $codeStore.setKey(filePath, code)
}
export const setCodePreview = (code: string) => {
  $codePreview.set(code)
}

export const setGenerationFinished = (finished: boolean) => {
  $generationFinished.set(finished)
}

export const setGenerationStarted = (started: boolean) => {
  $generationStarted.set(started)
}

export const setActiveFile = (filePath: string | null) => {
  $activeFile.set(filePath)
}

export const resetCode = () => {
  $codeStore.set({})
  $codePreview.set('')
  $generationFinished.set(false)
  $generationStarted.set(false)
  $activeFile.set(null)
}