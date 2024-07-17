import React, { useState } from 'react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';

interface TabBtnProps {
    onOngoingSelect: () => void;
    onConfirmedSelect: () => void;
    onCancelledSelect: () => void;
}

const TabBtn: React.FC<TabBtnProps> = ({
    onOngoingSelect,
    onConfirmedSelect,
    onCancelledSelect,
}) => {
    const [selected, setSelected] = useState('ongoing');

    const handleSelect = (value: string, callback: () => void) => {
        setSelected(value);
        callback();
    };

    return (
        <ButtonGroup isAttached variant="outline">
            <Button
                colorScheme={selected === 'ongoing' ? 'blue' : 'gray'}
                onClick={() => handleSelect('ongoing', onOngoingSelect)}
                isActive={selected === 'ongoing'}
            >
                <Text fontWeight="medium">Ongoing</Text>
            </Button>
            <Button
                colorScheme={selected === 'confirmed' ? 'blue' : 'gray'}
                onClick={() => handleSelect('confirmed', onConfirmedSelect)}
                isActive={selected === 'confirmed'}
            >
                <Text fontWeight="medium">Confirmed</Text>
            </Button>
            <Button
                colorScheme={selected === 'cancelled' ? 'blue' : 'gray'}
                onClick={() => handleSelect('cancelled', onCancelledSelect)}
                isActive={selected === 'cancelled'}
            >
                <Text fontWeight="medium">Cancelled</Text>
            </Button>
        </ButtonGroup>
    );
};

export default TabBtn;
