import React, { useState } from "react";

import "./Snowman.css";
import {ENGLISH_WORDS , randomWord } from "./words";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";


/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessed: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman(props) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, setNWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord(props.words));

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer
        .split("")
        .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessed(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** checks if max wrong has been reached for current game */
  let isMaxWrong = (nWrong === props.maxWrong)

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
            key={ltr}
            id={ltr}
            value={ltr}
            onClick={handleGuess}
            disabled={guessed.has(ltr)}
        >
          {ltr}
        </button>
    ));
  }

  /** render: render game */
  return (
      <div className="Snowman">
        <img src={(props.images)[nWrong]} alt={nWrong} />
        <p> Number wrong: {nWrong}</p>
        <p className="Snowman-word">{guessedWord()}</p>
        {/* Checks if the max number of wrong guesses reached,
          if it has, then shows "you lose", otherwise, 
          renders list of letters as buttons */}
        { isMaxWrong ? (
          <p>you lose</p>
        ) : (
          <p className="Snowman-buttons">{generateButtons()}</p>
        )}
      </div>
  );
}

Snowman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  words: ENGLISH_WORDS,
};


export default Snowman;