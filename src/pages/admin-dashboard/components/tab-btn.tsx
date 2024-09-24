import React from 'react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';

interface TabBtnProps {
    selectedTab: string;
    onUsersSelect: () => void;
    onDriversSelect: () => void;
}

const TabBtn: React.FC<TabBtnProps> = ({
    selectedTab,
    onUsersSelect,
    onDriversSelect,
}) => {
    return (
        <ButtonGroup isAttached variant="outline">
            <Button
                colorScheme={selectedTab === 'users' ? 'blue' : 'gray'}
                onClick={onUsersSelect}
                isActive={selectedTab === 'users'}
            >
                <Text fontWeight="medium">Users</Text>
            </Button>
            <Button
                colorScheme={selectedTab === 'drivers' ? 'blue' : 'gray'}
                onClick={onDriversSelect}
                isActive={selectedTab === 'drivers'}
            >
                <Text fontWeight="medium">Drivers</Text>
            </Button>
        </ButtonGroup>
    );
};

export default TabBtn;
