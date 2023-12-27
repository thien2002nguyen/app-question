import React from 'react';
import background from '../assets/background.jpg'
import { BsPatchQuestionFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const handleOnClickStart = () => {
        navigate('/question')
    }
    return (
        <div className='w-full h-[100vh] bg-[#0f0b2b] flex justify-center'>
            <img src={background} alt="" className='h-full object-cover' />
            <button
                className='flex items-center absolute bg-red-600 text-white px-5 py-2 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-red-500 duration-500 shadow-md shadow-white'
                onClick={handleOnClickStart}
            >
                <span className='pe-1'>Bắt đầu</span>
                <BsPatchQuestionFill />
            </button>
        </div>
    );
};

export default Home;