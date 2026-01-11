import React, { use } from "react";
import {useState, useEffect} from 'react';

export default function QuizApp(){

    // const [data, setData] = useState('');
    const [index, setIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isActive, setIsActive] = useState(true);
    
    const quiz = [
        {question: "Who is the largest animal on planet earth" , options:["cow", "elephant", "whale", "lion"], correct_answer: "whale"},
        {question: "National bird of India?" , options:["sparrow", "peacock", "koel", "kingfisher"], correct_answer: "peacock"},
        {question: "National fruit of India" , options:["Strawberry", "Mango", "Apple", "Banana"], correct_answer: "Mango"},
    ]

    // useEffect(()=>{
    //     async function getData(){
    //         const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //         throw new Error(`Response status: ${response.status}`);
    //         }

    //         const result = await response.json();
    //         console.log(result.results);
    //         setData(result.results);
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    //     }
    //     getData()
    // }, []);

    const question = quiz[index];

    const handleNext = ()=>{
        if(index <= quiz.length){
            setIndex(index+1);
        }
    }

    // const checkAnswer = (answer)=>{
    //     if (answer === question.correct_answer){
    //         setCorrect(answer);
    //     }
    // }

    function handleClick(e){
        console.log(e.target.textContent);
        if(e.target.textContent === question.correct_answer){
            e.target.style.backgroundColor = "green";
            e.target.style.color = "white";
        }
        else{
            e.target.style.backgroundColor = "red";
            e.target.style.color = "white";
        }
        setIsActive(false);
        
    }

    return (
        <div>
            <div className="w-screen h-screen bg-linear-to-br from-blue-300 to-blue-600 flex justify-center items-center ">
  <div className="min-h-6/12 w-8/12 bg-white rounded-lg px-4 py-2">
    <div>
      <span className="text-xl font-semibold">{`Question: ${index+1}/${quiz.length}`}</span>
    </div>
    <h1 className="text-2xl font-semibold">{`${index+1}. ${question.question}`}</h1>
    <ul className="mt-3 h-[200px] w-full flex flex-col space-y-2">
        {question.options.map(option=>
            <button onClick={handleClick} className={`w-full bg-blue-200 hover:bg-blue-300 hover:text-white cursor-pointer rounded-lg px-2 py-1 ` + (isActive && "cursor-not-allowed")} key={option} 
            >{option}</button>   
        )}
    </ul>
    <button className="bg-blue-400 text-white px-4 py-1 rounded-lg cursor-pointer" onClick={handleNext}>Next</button>
  </div>
</div>
        </div>
    )
}