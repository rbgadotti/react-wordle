import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components";
import Word from "./components/Word";
import { ValidatedLetter } from "./interfaces/ValidatedLetter";
// import { WORDS } from './words';
import GAME_CONFIG from './config';
import { getDayWord } from './functions';
import { isALetter } from './utils';

const Title = styled.h1`
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 60px;
`

const GameFinished = styled.h2`
  color: #fff;
  font-size: 60px;
  text-transform: uppercase;

  & small {
    display: block;
    font-size: 30px;
    margin-top: 30px;
  }
`

const TryAgainButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #312A2C;
  margin: 0 auto;
  color: #fff;
  font-size: 30px;
  padding: 20px 30px;
  cursor: pointer;
`

const TermoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

function App() {

  const DAY_WORD = useMemo(() => getDayWord().toUpperCase(), [])
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [word, setWord] = useState<string[]>([]);
  const [wordList, setWordList] = useState<Array<ValidatedLetter[]>>([]);

  const validateWord = useCallback((word: string[]): void => {

    const validatedLetterArray = word.map((letter, i) => {
      return {
        char: letter,
        positioned: letter === DAY_WORD[i],
        exists: DAY_WORD.includes(letter)
      };
    });

    setWordList((wordList) => [...wordList, validatedLetterArray])
    setWord([]);
    setCurrentAttempt((index) => index + 1);
    setCurrentWordIndex(0);

  }, [DAY_WORD])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { key } = e;

    if(key === "Enter"){
      if(word.length === 5){
        validateWord(word);
      }else{
        // invalid input effect
      }
    }else if(key === "Backspace"){
      if(word.length > 0){
        setWord(word => word.slice(0, -1))
        setCurrentWordIndex((index) => index - 1);
      }
    }else if(isALetter(key)){
      if(word.length < 5){
        setWord(word => [...word, key.toUpperCase()])
        setCurrentWordIndex((index) => index + 1);
      }
    }

    return false;
  }, [word, validateWord])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown])

  const renderWordAttempts = (attempts: number): React.ReactNode => {
    let newArray = new Array(attempts).fill(null);
    return newArray.map((_, i) => {
      return (
        <Word
          key={i}
          word={currentAttempt === i ? word : wordList?.[i]}
          done={currentAttempt > i}
          currentLetterIndex={currentWordIndex}
          enabled={currentAttempt === i}
        />
      )
    })
  }

  const checkPlayerWon = () => {
    const winRule = (letter:ValidatedLetter):boolean => letter.exists === true && letter.positioned === true;
    return wordList.filter(word => {
      return word.filter(winRule).length === GAME_CONFIG.WORD_SIZE;
    }).length > 0
  }

  const checkPlayerLose = () => {
    return wordList.length === GAME_CONFIG.ATTEMPTS;
  }

  const renderLogic = () => {
    if(checkPlayerWon()){
      return (
        <>
          <GameFinished>You Win!<small>The word is: {DAY_WORD}</small></GameFinished>
          <TryAgainButton>I'm ready for more</TryAgainButton>
        </>
      )
    }else if(checkPlayerLose()){
      return (
        <>
          <GameFinished>You lose!<small>But you can try again...</small></GameFinished>
          <TryAgainButton>Try Again</TryAgainButton>
        </>
      )
    }else{
      return (
        <TermoWrapper>
          {renderWordAttempts(GAME_CONFIG.ATTEMPTS)}
        </TermoWrapper>
      )
    }
  }

  return (
    <>
      <Title>React-Wordle</Title>
      {renderLogic()}
    </>
  );
}

export default App