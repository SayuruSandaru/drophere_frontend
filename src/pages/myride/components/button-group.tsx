import React, { useState } from 'react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';

interface OrderStatusTabsProps {
    onOngoingSelect: () => void;
    onCompletedSelect: () => void;
    onCancelledSelect: () => void;
    onConfirmedSelect: () => void;
}

const OrderStatusTabs: React.FC<OrderStatusTabsProps> = ({
    onOngoingSelect,
    onCompletedSelect,
    onCancelledSelect,
    onConfirmedSelect,
}) => {
    const [selected, setSelected] = useState('Orders');

    const handleSelect = (value: string, callback: () => void) => {
        setSelected(value);
        callback();
    };

    return (
        <ButtonGroup isAttached variant="outline">
            <Button
                colorScheme={selected === 'Orders' ? 'blue' : 'gray'}
                onClick={() => handleSelect('Orders', onOngoingSelect)}
                isActive={selected === 'Orders'}
            >
                <Text fontWeight="medium">Ongoing</Text>
            </Button>
            <Button
                colorScheme={selected === 'Confirmed' ? 'blue' : 'gray'}
                onClick={() => handleSelect('Confirmed', onConfirmedSelect)}
                isActive={selected === 'Confirmed'}
            >
                <Text fontWeight="medium">Confirmed</Text>
            </Button>
            <Button
                colorScheme={selected === 'Completed' ? 'blue' : 'gray'}
                onClick={() => handleSelect('Completed', onCompletedSelect)}
                isActive={selected === 'Completed'}
            >
                <Text fontWeight="medium">Completed</Text>
            </Button>
            <Button
                colorScheme={selected === 'Cancelled' ? 'blue' : 'gray'}
                onClick={() => handleSelect('Cancelled', onCancelledSelect)}
                isActive={selected === 'Cancelled'}
            >
                <Text fontWeight="medium">Cancelled</Text>
            </Button>
        </ButtonGroup>
    );
};

export default OrderStatusTabs;
