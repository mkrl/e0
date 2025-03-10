import { atom, computed } from 'nanostores'

export const $code = atom<string>('')
export const $generationFinished = atom<boolean>(false)
export const $generationStarted = atom<boolean>(false)

export const $hasCode = computed($code, code => code.length > 0)

export const setCode = (code: string) => {
  $code.set(code)
}

export const setGenerationFinished = (finished: boolean) => {
  $generationFinished.set(finished)
}

export const setGenerationStarted = (started: boolean) => {
  $generationStarted.set(started)
}