import React, {useState, useEffect} from "react";
import Confetti from "react-confetti";

import Die from "./components/Die/Die";

export default function App() {
    const [dice, setDice] = useState(
        Array.from({length:10}, (elem, id) => ({id: id, value: rollDie(), locked: false}))
    )
    const [isWon, setIsWon] = useState(false);

    function rollDie() {
        return Math.ceil(Math.random() * 6)
    }

    function toggleLock(id) {
        console.log(`Die ${id} locked`)
        setDice((prevDice) => 
            prevDice.map(die => die.id === id? 
                {...die, locked: !die.locked} :
                die
            )
        )
    }

    const diceElements = dice.map((die) => 
        <Die
            key={die.id}
            value={die.value} 
            locked={die.locked}
            handleClick={() => toggleLock(die.id)}
        />)

    function rerollDice() {
        setDice((prevDice) => prevDice.map((die) => die.locked? die : {...die, value: rollDie()}))
    }

    useEffect(
        () => {
            const allLocked = dice.every(die => die.locked);
            const allEqual = dice.every(die => die.value === dice[0].value)

            if (allLocked && allEqual) {
                setIsWon(true);
            }
        },
        [dice]
    )

    function resetGame() {
        setIsWon(false);
        setDice((prevDice) => prevDice.map((die) => ({...die, locked: false})))
        rerollDice();
    }

    return (
        <div className="App__background">
            {isWon && <Confetti />}
            <h1 className="App__header">Tenzies</h1>
            <p className="App__description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="App__diceContainer">
                {diceElements}
            </div>
            {!isWon && <button className="App__rollButton" onClick={rerollDice}>Roll</button>}
            {isWon && <button className="App__rollButton" onClick={resetGame}>New Game</button>}
        </div>
    )
}