import React, { useState } from 'react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';

interface TabBtnProps {
    onUsersSelect: () => void;
    onDriversSelect: () => void;
}

const TabBtn: React.FC<TabBtnProps> = ({
    onUsersSelect,
    onDriversSelect,
}) => {
    const [selected, setSelected] = useState('users');

    const handleSelect = (value: string, callback: () => void) => {
        setSelected(value);
        callback();
    };

    return (
        <ButtonGroup isAttached variant="outline">
            <Button
                colorScheme={selected === 'users' ? 'blue' : 'gray'}
                onClick={() => handleSelect('users', onUsersSelect)}
                isActive={selected === 'users'}
            >
                <Text fontWeight="medium">Users</Text>
            </Button>
            <Button
                colorScheme={selected === 'drivers' ? 'blue' : 'gray'}
                onClick={() => handleSelect('drivers', onDriversSelect)}
                isActive={selected === 'drivers'}
            >
                <Text fontWeight="medium">Drivers</Text>
            </Button>
        </ButtonGroup>
    );
};

export default TabBtn;
