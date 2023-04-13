import styled from "styled-components";
import Letter from "./Letter";
import { ValidatedLetter } from "../interfaces/ValidatedLetter";
import GAME_CONFIG from "../config";

interface ComponentProps {
  word?: ValidatedLetter[] | string[];
  currentLetterIndex: number;
  done: boolean;
  enabled: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`

export default function Word({ word, currentLetterIndex, done, enabled }: ComponentProps) {
  const handleCreateLetters = () => {
    let newArray = new Array(GAME_CONFIG.WORD_SIZE).fill(null);
    return newArray.map((_, i) => {
      return <Letter key={i} letter={word?.[i]} current={currentLetterIndex === i} enabled={enabled} done={done} />
    })
  }

  return (
    <Wrapper>
      {handleCreateLetters()}
    </Wrapper>
  )
}