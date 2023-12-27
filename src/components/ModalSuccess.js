import React from 'react';
import { HiAcademicCap } from "react-icons/hi2";
import { LuAlarmClock } from "react-icons/lu";
import { BsPatchQuestion } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ModalSuccess = ({ onClickReset, totalCorrect, time }) => {
    const navigate = useNavigate()
    const handleOnClickClose = () => {
        navigate('/')
    }
    const handleOnClickReset = () => {
        onClickReset()
    }
    return (
        <div className='lg:w-1/4 md:w-1/2 w-2/3 h-56 bg-correct text-white rounded-xl p-8 shadow-md shadow-white relative'>
            <div className='flex justify-center items-center font-semibold font-main text-2xl'>
                <span className='pe-1'>Kết quả</span>
                <HiAcademicCap />
            </div>
            <div className='flex justify-start items-center mt-3'>
                <LuAlarmClock />
                <span className='ps-1'>Thời gian: {String(Math.floor(time / 60)).padStart(2, '0') + ' : ' + String(time % 60).padStart(2, '0')}</span>
            </div>
            <div className='flex justify-start items-center mt-2'>
                <BsPatchQuestion />
                <span className='ps-1'>Đáp án đúng: {totalCorrect} câu</span>
            </div>
            <button
                className='flex bg-red-500 hover:bg-red-400 duration-500 items-center mt-8 mx-auto py-1 px-4 rounded-md shadow-sm shadow-white'
                onClick={handleOnClickReset}
            >
                <span className='pe-1'>Làm lại</span>
                <GrPowerReset />
            </button>
            <button
                className='absolute top-3 right-3 text-2xl bg-red-500 hover:bg-red-400 duration-500 rounded-full shadow-sm shadow-white'
                title='Quay lại'
                onClick={handleOnClickClose}
            >
                <IoIosCloseCircle />
            </button>
        </div>
    );
};

export default ModalSuccess;