'use client'

import React from "react";
import { HStack, StackSeparator, Kbd } from "@chakra-ui/react";
import styles from "./page.module.css";
import { UIData } from "./GameData";
/*
import { keyframes } from "motion";
*/

export interface KeyStatus {
  letter: string,
  mode: KeyMode
}

export enum KeyMode {
  BOUGHT,
  PURCHASEABLE,
  REPEAT_PURCHASEABLE,
  VISIBLE,
  REPEAT_TOGGLE
}

const Key = ({ letter, highlight, mode, onclick } :
   { letter: string, highlight: boolean, mode: KeyMode, onclick: () => void}) => {
  let palette:string = "";

  switch(mode)
  {
    case KeyMode.BOUGHT:
      if (highlight)
        palette = 'yellow';
      else
        palette = 'orange';
      break;
    case KeyMode.PURCHASEABLE:
      palette = 'red';
      break;
    case KeyMode.REPEAT_PURCHASEABLE:
      palette = 'purple';
      break;
    case KeyMode.VISIBLE:
      palette = 'gray';
      break;
    case KeyMode.REPEAT_TOGGLE:
      palette = 'green';
      break;
    default:
  };

  return (
    <div className={styles.kbd}>
    <Kbd size='lg'
         variant={highlight ? 'subtle' : 'raised'}
         className={styles.Kbd}
         onClick={onclick}
         colorPalette={palette}>
      <div className={styles.KbdKey}>
        {letter}
        </div>
    </Kbd>
    </div>
  )
}

const Keyboard = ({allKeyStatus, focusedKey, clickCallback, repeatModeCallback, repeatVisible, pressed}:
   {allKeyStatus: KeyStatus[], focusedKey: string, repeatModeCallback: () => void,
     clickCallback: (key: string) => void, repeatVisible: boolean, pressed: boolean}) => {
  
  const [keyHighlight, setKeyHighlight] = React.useState<boolean>(false);

  const triggerKeyHighlight = () => {
    if (!keyHighlight)
    {
      setKeyHighlight(true);
      window.setTimeout(
        () => setKeyHighlight(false),
        UIData.highlightDuration);
    }
  }

  React.useEffect(()=>{
    if (pressed)
      triggerKeyHighlight();
  },[pressed, focusedKey, keyHighlight]);
  //});

  return (
    <HStack className={styles.stack} separator={<StackSeparator />}>
    { repeatVisible &&
    <div className={styles.kbd}>
      <Kbd size='lg'
          variant='subtle'
          className={styles.Kbd}
          onClick={repeatModeCallback}
          colorPalette='blue'>
      <div className={styles.KbdKey}>
        rpt
        </div>
      </Kbd>
    </div>}
    {allKeyStatus.map((keyStatus: KeyStatus) =>
       <Key key={keyStatus.letter}
            highlight={keyHighlight && (keyStatus.letter == focusedKey)}
            letter={keyStatus.letter}
            onclick={() => clickCallback(keyStatus.letter)}
            mode={keyStatus.mode}/>)} 
    </HStack>
  )
}

export default Keyboard;