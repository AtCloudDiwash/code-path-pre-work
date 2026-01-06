import { useEffect, useState } from 'react';
import styles from "../Styles/quiz.module.css";
import {Button, RevertedButton} from "../Components/Button";

const quizData = [
  {
    question: "What is MrBeast's real name?",
    options: ["James Donaldson", "Jimmy Donaldson", "John Donaldson"],
    correctOption: 1
  },
  {
    question: "What genre of music is Dua Lipa primarily known for?",
    options: ["Pop", "Country", "Rock"],
    correctOption: 0
  },
  {
    question: "Which platform did IShowSpeed become famous on?",
    options: ["TikTok", "YouTube", "Twitch"],
    correctOption: 1
  },
  {
    question: "What is Kanye West's nickname that he often goes by?",
    options: ["Ye", "K-West", "Yeezy"],
    correctOption: 0
  },
  {
    question: "What type of content is MrBeast most famous for?",
    options: ["Gaming videos", "Challenge and giveaway videos", "Music videos"],
    correctOption: 1
  }
];

export default function Quiz() {

  const [showNextButton, setShowNextButton] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] =useState(0);

  function handleShouldReset(res){
    if(res){
      setQuizIndex(0);
      setScore(0);
    }
  }

  function handleScore(res){
    if(res){
      setScore(score + 1);
    }
  }

  function handleNextDisplay(res){
    if(res){
      setShowNextButton(true);
    } 
  }

  function gotoNextQuestion(){
    setShowNextButton(false);
    setQuizIndex(quizIndex+1);
  }

  if(quizIndex > quizData.length-1){
    return(
      <>
        <ResultBoard fullPoints = {quizData.length} scoredPoints = {score} shouldReset={handleShouldReset}/>
      </>
    )
  }
  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.boardStatus}>
            <span>Question {quizIndex+1}/{quizData.length}</span>   
            <span>Score: {score}</span>
        </div>    
        <div className={styles.fluidContainer}>
            <div className={styles.fluid} style={{width: `${((quizIndex + 1) / quizData.length) * 100}%`}}></div>
        </div>
        <div className={styles.boardWrapper}>
              <Board quizData={quizData[quizIndex]} onResponse={handleNextDisplay} onResult={handleScore}/>
              {showNextButton && <div className={styles.nextBtn}><Button bTitle={"Next Question"} type="primary" onResponse={gotoNextQuestion}/></div>}
        </div>
      </div>
    </div>
  );
}


function Board({quizData, onResponse, onResult}){

  const [isCorrect, setIsCorrect] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswer, setIsAnswer] = useState(null);

  useEffect(()=>{
    resetDefault();
  }, [quizData])


  function resetDefault(){
    setIsClicked(false);
    onResponse(false);
    setShowAnswer(false);
    onResult(false);
  }

  function checkAnswer(index){
    setIsClicked(true);
    onResponse(true);
    setShowAnswer(true);
    setIsAnswer(quizData.options[quizData.correctOption])
    if(index === quizData.correctOption){
      setIsCorrect(true);
      onResult(true);
    } else{
      setIsCorrect(false);
      onResult(false);
    }
  }

  return(
    <div>

        <div>

          <span>{quizData.question}</span>

        </div>

        <div className={styles.options}>

            {
              quizData.options.map((option, index)=>(
                  <button key={index} onClick={()=>checkAnswer(index)} disabled = {isClicked} className={styles.optionBtn}>{option}</button>
              ))
            } 

        </div>

        <div>

          {showAnswer && (<span className={styles.answer}>Answer: {isAnswer}</span>)}
        </div>

    </div>

  )
}

function ResultBoard({fullPoints, scoredPoints, shouldReset}){
    return(
      <div className={styles.resultBoardContainer}>

        <div>

            <h2>Quiz Complete</h2>
            <h2 className={styles.scoreOutOf}>{scoredPoints}/{fullPoints}</h2>
            <span>You got {scoredPoints} out of {fullPoints}</span>
            
    
              <button onClick={()=>shouldReset(true)} className={styles.tryAgainBtn}>Try Again</button>
      

        </div>

      </div>
    )
}