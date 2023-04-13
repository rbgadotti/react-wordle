import { WORDS } from "./words"

export const getDayWord = () => {
  return WORDS[Math.floor((Math.random()*WORDS.length))];
}