import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';

// Importing Assets
import displayLogo from '../Assets/Display.svg';
import dropDownLogo from '../Assets/down.svg';
import { Task_Card } from '../Components/Task_Card';
import { Task_user_info } from '../Components/Task_user_info';
import { Dropdown_item } from '../Components/Dropdown_item';
import { useDispatch, useSelector } from 'react-redux';
import { Task_priority_card } from '../Components/Task_priority_card';
import { Task_status_card } from '../Components/Task_status_card';

export const Home = () => {
    const dispatch = useDispatch();
    const { order, group } = useSelector((state) => state.sorting);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isGroupOpen, setGroupOpen] = useState(false);
    const [isOrderOpen, setOrderOpen] = useState(false);

    const [userInfo, setUserInfo] = useState([]);
    const [taskInfo, setTaskInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                console.log("Data from backend ", res.data);
                setUserInfo(res.data.users);
                setTaskInfo(res.data.tickets);
                setLoading(false);
                setReady(true);
            } catch (error) {
                console.log("Error in fetching data from backend ", error);
                setLoading(false);
                setReady(true);
                setError(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (ready) {
            const sorted = sortAndGroupTasks(userInfo, taskInfo, group, order);
            setSortedTasks(sorted);
        }
    }, [group, order, userInfo, taskInfo, ready]);

    const sortAndGroupTasks = (users, tasks, groupBy, orderBy) => {
        let groupedTasks = [];

        if (groupBy === "User") {
            groupedTasks = users.map(user => {
                const userTasks = tasks.filter(task => task.userId === user.id);
                return {
                    user,
                    tasks: sortTasks(userTasks, orderBy),
                    count: userTasks.length // Count of tasks for the user
                };
            });
        } else if (groupBy === "Status") {
            const statuses = [...new Set(tasks.map(task => task.status))];
            groupedTasks = statuses.map(status => {
                const statusTasks = tasks.filter(task => task.status === status);
                return {
                    status,
                    tasks: sortTasks(statusTasks, orderBy),
                    count: statusTasks.length // Count of tasks for the status
                };
            });
        } else if (groupBy === "Priority") {
            const priorities = [...new Set(tasks.map(task => task.priority))].sort((a, b) => b - a);
            groupedTasks = priorities.map(priority => {
                const priorityTasks = tasks.filter(task => task.priority === priority);
                return {
                    priority,
                    tasks: sortTasks(priorityTasks, orderBy),
                    count: priorityTasks.length // Count of tasks for the priority
                };
            });
        }

        return groupedTasks;
    };

    const sortTasks = (tasks, orderBy) => {
        if (orderBy === "Priority") {
            return tasks.sort((a, b) => Number(b.priority) - Number(a.priority)); // Descending order
        } else if (orderBy === "Title") {
            return tasks.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order
        }
        return tasks; // No sorting
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        setGroupOpen(false);
        setOrderOpen(false);
    };

    if (loading || !ready) return <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>Loading...</div>;
    if (error) {
        return <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                 Error in fetching data from backend. Please try again later.
               </div>;
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='header_item' onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    <img src={displayLogo} alt="display_logo" />
                    <div style={{ marginTop: '-0.2rem' }}>Display</div>
                    <img src={dropDownLogo} alt='dropDown_logo' />
                </div>

                {isDropdownOpen && (
                    <Dropdown_item setDropdownOpen={setDropdownOpen} isGroupOpen={isGroupOpen} setGroupOpen={setGroupOpen}
                        isOrderOpen={isOrderOpen} setOrderOpen={setOrderOpen} />
                )}
            </div>

            <div className='main'>
                <div className='flexBox'>
                    {sortedTasks.map((groupedItem) => (
                        <div key={groupedItem.user?.id || groupedItem.status || groupedItem.priority}>
                            {/* This is for Column */}
                            {group === "User" && groupedItem.user && (
                                <div>
                                    <Task_user_info user={groupedItem.user} taskCount={groupedItem.count} />
                                </div>
                            )}
                            {group === "Status" && (
                                <div>
                                    <Task_status_card status={groupedItem.status} taskCount={groupedItem.count} />
                                </div>
                            )}
                            {group === "Priority" && (
                                <div>
                                    <Task_priority_card priority={groupedItem.priority} taskCount={groupedItem.count} />
                                </div>
                            )}
                                {/* This is for Column items */}
                            {groupedItem.tasks.map((task) => (
                                <Task_Card key={task.id} task={task} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
