import React from 'react';
import '../styles/Task_Card.css';

//imoporting Assets here
import addLogo from '../Assets/add.svg';
import threeDotLogo from '../Assets/3 dot menu.svg';
import userLogo from '../Assets/UserLogo.png';

import Urgent from '../Assets/SVG - Urgent Priority colour.svg';
import High from '../Assets/Img - High Priority.svg';
import Medium from '../Assets/Img - Medium Priority.svg';
import Low from '../Assets/Img - Low Priority.svg';
import No_Priority from '../Assets/No-priority.svg';


export const Task_priority_card = ({ priority,taskCount }) => {
    console.log("priority in card ", priority);
    return (
        <div className='task_user_info'>
            <div >
                <img
                    src={
                        priority === 4 ? Urgent
                            : priority === 3 ? High
                                : priority === 2 ? Medium
                                    : priority === 1 ? Low
                                        : No_Priority
                    }
                    alt='priority_logo'
                />
                <h4>
                    {priority === 4 ? 'Urgent'
                        : priority === 3 ? 'High'
                            : priority === 2 ? 'Medium'
                                : priority === 1 ? 'Low'
                                    : 'No Priority'
                    }
                </h4>
                <h4 className='text-gray'>{taskCount}</h4>
                {/* <div className='text-gray'>2</div> */}
            </div>
            <div className='flex text-gray'>
                <img src={addLogo} alt='+ icon'></img>
                <img src={threeDotLogo} alt='3dot logo'></img>
            </div>
        </div>
    )
}
