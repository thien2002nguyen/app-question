import React, { useEffect, useState } from 'react';
import bg from '../assets/bg.png'
import { GiExitDoor } from "react-icons/gi";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import data from '../data/question.json'
import ModalSuccess from '../components/ModalSuccess';
import { FcAlarmClock } from "react-icons/fc";
const Question = () => {
    const [questions, setQuestions] = useState(null)
    const [nowQuestions, setNowQuestion] = useState(null)
    const [index, setIndex] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isChoose, setIsChoose] = useState(false)
    const [choose, setChoose] = useState(null)
    const [correct, setCorrect] = useState(false)
    const [totalQuestion, setTotalQuestion] = useState(0)
    const [count, setCount] = useState(0)
    const [newQuestions, setNewQuestions] = useState(null)
    const [time, setTime] = useState(0)
    const [options, setOptions] = useState(null)
    useEffect(() => {
        if (!isSuccess && time < 60 * 60) {
            const timer = setTimeout(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setIsSuccess(true);
        }
    }, [time, isSuccess]);
    useEffect(() => {
        setQuestions(data)
        setTotalQuestion(data.length)
    }, [])
    useEffect(() => {
        if (questions) {
            setNewQuestions(shuffleArray(questions))
        }
    }, [questions])
    useEffect(() => {
        if (nowQuestions) {
            setOptions(shuffleArray(nowQuestions.options))
        }
    }, [nowQuestions])
    useEffect(() => {
        if (newQuestions) {
            setNowQuestion(newQuestions[index]);
        }
        if (index === totalQuestion - 1) {
            setIsSuccess(true)
        }
    }, [newQuestions, index, totalQuestion])
    const navigate = useNavigate()
    const handleOnClickClose = () => {
        navigate('/')
    }
    const handleOnClickNext = () => {
        if (index < totalQuestion) {
            setIndex(index + 1)
        }
        setIsChoose(false)
        setChoose(null)
        setCorrect(false)
    }
    const handleOnClickOption = (index) => {
        setIsChoose(true)
        setChoose(index)
        if (options[index] === nowQuestions.correct) {
            setCorrect(true)
            setCount(count + 1)
        }
    }
    const handleOnClickReset = () => {
        setIndex(0)
        setIsSuccess(false)
        setIsChoose(false)
        setChoose(null)
        setCorrect(false)
        setTime(0)
    }
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    return (
        <div className='relative h-[100vh]'>
            <div className='absolute top-0 left-0 z-0 w-full h-full bg-[#0f0b2b] flex justify-center'>
                <img src={bg} alt="" className='h-full object-cover' />
            </div>
            <div className='absolute top-20 left-0 z-10 w-full flex justify-center'>
                <p className='text-white bg-[#322588] px-5 py-2 rounded-lg lg:w-5/12 md:w-7/12 w-11/12 text-center shadow-md shadow-white'>
                    Câu {index + 1}: {nowQuestions?.question}
                </p>
            </div>
            <div className='absolute top-48 left-0 z-10 w-full flex flex-col items-center gap-4'>
                {options?.map((item, index) => (
                    <button
                        key={index}
                        className={choose === index
                            ? `text-white px-5 py-2 rounded-lg lg:w-5/12 md:w-7/12 w-11/12 text-center shadow-sm shadow-white ${correct ? 'bg-correct' : 'bg-incorrect'}`
                            : 'text-white bg-option px-5 py-2 rounded-lg lg:w-5/12 md:w-7/12 w-11/12 text-center shadow-sm shadow-white'}
                        onClick={isChoose ? null : () => handleOnClickOption(index)}
                    >
                        {item}
                    </button>
                ))}
                <button
                    className={isSuccess || !isChoose ?
                        'flex items-center bg-red-200 text-white px-5 py-2 rounded-md shadow-sm shadow-white'
                        : 'flex items-center bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-500 duration-500 shadow-sm shadow-white'}
                    onClick={isSuccess || !isChoose ? null : handleOnClickNext}
                >
                    <span className='pe-1'>Câu sau</span>
                    <GrFormNextLink />
                </button>
            </div>
            <button
                className='absolute top-5 right-5 z-10 text-3xl flex justify-center text-white'
                title='Quay lại'
                onClick={handleOnClickClose}
            >
                <GiExitDoor />
            </button>
            <div className='absolute top-5 left-5 z-10 text-4xl flex items-center justify-center text-white'
                title='Quay lại'
            >
                <FcAlarmClock />
                <span className='ps-2'>
                    {String(Math.floor(time / 60)).padStart(2, '0') + ' : ' + String(time % 60).padStart(2, '0')}
                </span>
            </div>
            {isSuccess && isChoose &&
                <div className='absolute top-0 left-0 z-20 w-full h-full bg-[#33333355] flex justify-center items-center'>
                    <ModalSuccess onClickReset={handleOnClickReset} totalCorrect={count} time={time} />
                </div>
            }
        </div>
    );
};

export default Question;