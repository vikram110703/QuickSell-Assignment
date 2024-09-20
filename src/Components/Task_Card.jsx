import React from 'react';
import '../styles/Task_Card.css';

// importing assets 
import doneLogo from '../Assets/Done.svg';
import to_do from '../Assets/To-do.svg';
import in_progress from '../Assets/in-progress.svg';
import backlog from '../Assets/Backlog.svg';
import dotLine from '../Assets/3 dot menu.svg';
import Urgent from '../Assets/SVG - Urgent Priority colour.svg';
import High from '../Assets/Img - High Priority.svg';
import Medium from '../Assets/Img - Medium Priority.svg';
import Low from '../Assets/Img - Low Priority.svg';
import No_Priority from '../Assets/No-priority.svg';
import dot from '../Assets/Backlog.svg';
import userLogo from '../Assets/UserLogo.png';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';




export const Task_Card = ({ task, order }) => {

    // console.log("task in taskCard", task);
    // console.log("order in taskCard", order);

    const { group } = useSelector((state) => state.sorting);

    const color = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown'];
    const randomColor = color[Math.floor(Math.random() * color.length)];

    let isVisible_user_logo = true;
    if (group === "User") isVisible_user_logo = false;

    return (
        <div className='task_container'>
            <div className='text-gray flex-space-between'>
                <div >{task.id}</div>
                <div style={{ color: randomColor, fontSize: '1.5rem' ,display: isVisible_user_logo ? '' : 'none' }}>
                    <FaUserCircle />
                </div>
                 
            </div>
            <div className='flex'>
                <img
                    src={
                        task.status === "In progress" ? in_progress
                            : task.status === "Todo" ? to_do
                                : task.status === "done" ? doneLogo
                                    : backlog
                    }
                    alt='status_logo'
                />

                <div className='font-bold'>{task.title}</div>
            </div>
            <div className='flex text-gray'>
                <div className='border '>
                    <img
                        src={
                            task.priority === 4 ? Urgent
                                : task.priority === 3 ? High
                                    : task.priority === 2 ? Medium
                                        : task.priority === 1 ? Low
                                            : No_Priority
                        }
                        alt='status_logo'
                    />
                </div>
                <div className='flex border '>
                    <img className='rounded_gray' src={to_do} alt="dot" />
                    <div>{task.tag ? task.tag[0] : ""}</div>
                </div>
            </div>
        </div>
    )
}
