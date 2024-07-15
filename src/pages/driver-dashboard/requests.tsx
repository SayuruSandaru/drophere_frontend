import React from 'react';
import { Text, } from "@chakra-ui/react"
import RideReqTable from './components/ride-requests';

const Requests: React.FC = () => {

    return (
        <>
            <Text>Available Ride requests</Text>
            <RideReqTable />
        </>
    );
};

export default Requests;