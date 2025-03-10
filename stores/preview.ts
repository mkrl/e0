import { atom, computed } from 'nanostores'

export const $previewLink = atom<string>('')

export const $hasLink = computed($previewLink, link => link.length > 0)

export const setLink = (link: string) => {
  $previewLink.set(link)
}

