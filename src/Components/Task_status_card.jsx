import React from 'react';
import '../styles/Task_Card.css';

//imoporting Assets here
import addLogo from '../Assets/add.svg';
import threeDotLogo from '../Assets/3 dot menu.svg';
import userLogo from '../Assets/UserLogo.png';

import doneLogo from '../Assets/Done.svg';
import to_do from '../Assets/To-do.svg';
import in_progress from '../Assets/in-progress.svg';
import backlog from '../Assets/Backlog.svg';

export const Task_status_card = ({ status ,taskCount}) => {
    console.log("status in status card", status);
    return (
        <div className='task_user_info'>
            <div >
                <img
                    src={
                        status === "In progress" ? in_progress
                            :status === "Todo" ? to_do
                            :status === "done" ? to_do
                                : backlog
                    }
                    alt='status_logo'
                />
                <h4>{status}</h4>
                <div className='text-gray'>{taskCount}</div>
            </div>
            <div className='flex text-gray'>
                <img src={addLogo} alt='+ icon'></img>
                <img src={threeDotLogo} alt='3dot logo'></img>
            </div>
        </div>
    )
}
