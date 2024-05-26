/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import getSocket from 'config/app/socket.io';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';


const socketEvents = () => {
    const socket = getSocket();
    const userProfile = useSelector((store: StoreType) => store.ProfileReducer);

    return { socket, userProfile };

};

export default socketEvents;
