import React from 'react';
import '../styles/Task_Card.css';

//imoporting Assets here
import addLogo from '../Assets/add.svg';
import threeDotLogo from '../Assets/3 dot menu.svg';
import userLogo from '../Assets/UserLogo.png';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';


export const Task_user_info = ({ user ,taskCount}) => {
    const { group } = useSelector((state) => state.sorting);

    const color = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown'];
    const randomColor = color[Math.floor(Math.random() * color.length)];

    let isVisible_user_logo = true;
    if (group === "User") isVisible_user_logo = false;


    return (
        <div className='task_user_info'>
            <div >
                {/* <img src={userLogo} alt='user_image' /> */}
                <div style={{ color: randomColor, fontSize: '1.5rem'}}>
                    <FaUserCircle />
                </div>
                <h4>{user.name}</h4>
                <div className='text-gray'>{taskCount}</div>
            </div>
            <div className='flex text-gray'>
                <img src={addLogo} alt='+ icon'></img>
                <img src={threeDotLogo} alt='3dot logo'></img>
            </div>
        </div>
    )
}
