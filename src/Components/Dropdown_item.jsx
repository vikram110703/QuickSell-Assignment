import React from 'react';
import '../styles/Dropdown.css';

import dropDownLogo from '../Assets/down.svg';
import { setSorting } from '../Redux/sortingSlice';
import { useDispatch, useSelector } from 'react-redux';


export const Dropdown_item = ({ setDropdownOpen, isGroupOpen, setGroupOpen, isOrderOpen, setOrderOpen }) => {

    const dispatch = useDispatch();

    const { group, order } = useSelector((state) => state.sorting);

    const toggleGroup = () => {
        setOrderOpen(false);
        if(isGroupOpen){
            setDropdownOpen(false);
            setGroupOpen(false);
        }
        else{
            setGroupOpen(true);
            setDropdownOpen(true);
        }

        
    };

    const toggleOrder = () => {
        setGroupOpen(false);
        if(isOrderOpen){
            setDropdownOpen(false);
            setOrderOpen(false);
        }
        else{
            setOrderOpen(true);
            setDropdownOpen(true);
        }
    };

    const handllerForGroup = (groupBy) => {
        console.log("Group by ", groupBy);
        dispatch(setSorting({ group: groupBy }));
        setGroupOpen(false);
        setOrderOpen(false);

    };

    const handllerForOrder = (orderBy) => {
        console.log("Order by ", orderBy);
        dispatch(setSorting({ order: orderBy }));
    };

    return (
        <div className="dropdown-menu">
            {/* <div> */}
            <div className='flex-space-between margin-bottom' onClick={toggleGroup}>
                <div className='text-gray'>Group</div>
                <div style={{ minWidth: '6rem' }} className='flex flex-space-between border'>
                    <div style={{ paddingBlock: '0.3rem' }}>{group}</div>
                    <img src={dropDownLogo} />
                </div>
                {isGroupOpen && (
                    <div className="submenu">
                        <div onClick={() => handllerForGroup("User")}>User</div>
                        <div onClick={() => handllerForGroup("Status")}>Status</div>
                        <div onClick={() => handllerForGroup("Priority")}>Priority</div>
                    </div>
                )}
            </div>
            <div className='flex-space-between margin-bottom' onClick={toggleOrder}>
                <div className='text-gray'>Order</div>
                <div style={{ minWidth: '6rem' }} className='flex border flex-space-between'>
                    <div style={{ paddingBlock: '0.3rem' }}>{order}</div>
                    <img src={dropDownLogo} />
                </div>

                {isOrderOpen && (
                    <div className="submenu_2">
                        <div onClick={() => handllerForOrder("Priority")}>Priority</div>
                        <div onClick={() => handllerForOrder("Title")}>Title</div>
                    </div>
                )}
            </div>
            {/* </div> */}
        </div>
    )
}
