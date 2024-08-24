import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDetails from "./ProfileDetails";

const Home = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  console.log(isAuthenticated);
  const diceNumbers = Array.from({ length: 11 }, (_, i) => i + 2);
  const [selectedNumber, setSelecteNumber] = useState<number | null>(null);
  const [isDiceRool, setIsDiceRool] = useState<boolean>(false);
  const [totalVal, setTotalVal] = useState<number>(0);
  const [dice1, setDice1] = useState<number>(1);
  const [dice2, setDice2] = useState<number>(1);
  const [lossMessage] = useState<string>(
    `Oh no, ${"You"} lost the game: 😢💔`
  );
  const [wonMassage] = useState<string>(
    `${"Wow,"} ${"You"} ${"won the game: 🏆🎉"}`
  );
  const [isGame, setIsGame] = useState(false);

  const diceIcons = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
  ];

  const handleSelect = (num: number) => {
    setIsDiceRool(false);
    setIsGame(true);
    setSelecteNumber(selectedNumber === num ? null : num);
  };

  const handleDice = () => {
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(newDice1);
    setDice2(newDice2);
    setTotalVal(newDice1 + newDice2);
    setIsDiceRool(true);
    setIsGame(false);
  };

  const handlePlayAgain = () => {
    setSelecteNumber(null);
  };

  setTimeout(() => {
    setIsDiceRool(false);
  }, 1000);

  const [isProfile, setIsProfile] = useState(false);

  return (
    <>
      <div>
        <header className="header">
          Dice-Roller
          {isAuthenticated ? (
            <img
              className="userPic"
              src={user?.picture}
              alt="profilePic"
              onClick={() => setIsProfile(true)}
            />
          ) : (
            <button className="loginbtn" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          )}
          {isProfile && <ProfileDetails />}
        </header>
        <div className="body">
          {diceNumbers.map((number) => (
            <div key={number} className="card">
              <div className="card-header">
                <h1>{number}</h1>
              </div>
              <div
                className={`${
                  selectedNumber === number ? "container-selected" : "container"
                }`}
                onClick={() => handleSelect(number)}
              >
                <p>
                  <h4>Bet</h4>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="dice-container">
          <div className="dice-one">
            <FontAwesomeIcon
              className={`dice ${isDiceRool ? "shake" : ""}`}
              icon={diceIcons[dice1 - 1]}
            />
          </div>
          <div className="dice-sec">
            <FontAwesomeIcon
              className={`dice ${isDiceRool ? "shake" : ""}`}
              icon={diceIcons[dice2 - 1]}
            />
          </div>
        </div>
        <div className="res-container">
          <h4>Total Number: {totalVal}</h4>
          {isGame ? (
            <button className="dice-btn" onClick={handleDice}>
              Roll Dice
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="res-container">
          {totalVal === selectedNumber && totalVal > 0 ? (
            <h3>{wonMassage}</h3>
          ) : (
            ""
          )}
          {totalVal !== selectedNumber && totalVal > 0 ? (
            <h3>{lossMessage}</h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
