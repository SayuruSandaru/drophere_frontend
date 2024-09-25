import React from 'react';
import { Button, Text, ButtonGroup } from '@chakra-ui/react';

interface DisputeTabProps {
    selectedTab: string;
    onComplainSelect: () => void;
    onCancelSelect: () => void;
}

const DisputeTab: React.FC<DisputeTabProps> = ({
    selectedTab,
    onComplainSelect,
    onCancelSelect,
}) => {
    return (
        <ButtonGroup isAttached variant="outline">
            <Button
                colorScheme={selectedTab === 'complain' ? 'blue' : 'gray'}
                onClick={onComplainSelect}
                isActive={selectedTab === 'complain'}
            >
                <Text fontWeight="medium">Complain</Text>
            </Button>
            <Button
                colorScheme={selectedTab === 'cancel' ? 'blue' : 'gray'}
                onClick={onCancelSelect}
                isActive={selectedTab === 'cancel'}
            >
                <Text fontWeight="medium">Ride Cancel</Text> {/* Updated the text here */}
            </Button>
        </ButtonGroup>
    );
};

export default DisputeTab;
