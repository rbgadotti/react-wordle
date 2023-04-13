import styled from "styled-components";
import GAME_CONFIG from "../config";
import { ValidatedLetter } from "../interfaces/ValidatedLetter";

interface ComponentProps {
  letter?: string | ValidatedLetter;
  current: boolean;
  enabled: boolean;
  done: boolean;
}

const handleBackgroundColor = (props: ComponentProps) => {
  if(typeof props.letter !== "string"){
    if(props.letter?.positioned){
      return "#3aa394"
    }else if(props.letter?.exists){
      return "#d3ad69"
    }else if(props.done){
      return "#312A2C"
    }
  }
  return "transparent";
}

const handleBorderColor = (props: ComponentProps) => {
  if(typeof props.letter !== "string"){
    if(props.letter?.positioned){
      return "#3aa394"
    }else if(props.letter?.exists){
      return "#d3ad69"
    }else if(props.done){
      return "#312A2C"
    }
  }
  return GAME_CONFIG.SQUARE_COLOR;
}

const handleFontColor = (props: ComponentProps) => {
  if(props.done){
    return "#fff"
  }
  return "#000";
}

const handleContent = (props: ComponentProps) => {
  return typeof props.letter === "string" ? props.letter : props.letter?.char;
}

export default styled.div<ComponentProps>`
  position: relative;
  display: block;
  width: ${GAME_CONFIG.SQUARE_SIZE + "px"};
  height: ${GAME_CONFIG.SQUARE_SIZE + "px"};
  border-width: 5px;
  border-style: solid;
  border-color: ${props => handleBorderColor(props)};
  ${props => props.enabled && props.current ? "border-bottom-width: 10px" : ""};
  border-radius: 10%;
  color: ${props => handleFontColor(props)};
  background-color: ${props => handleBackgroundColor(props)};

  &:before {
    content: "${props => handleContent(props)}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: ${props => handleFontColor(props)};
    font-size: ${GAME_CONFIG.LETTER_SIZE + "px"};
    font-weight: bold;
    text-transform: uppercase;
  }
`

