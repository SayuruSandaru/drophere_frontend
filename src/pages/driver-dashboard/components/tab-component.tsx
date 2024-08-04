import React, { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Ongoing');

    const tabs = ['Ongoing', 'Completed', 'Cancelled'];

    return (
        <Flex mb={4}>
            {tabs.map(tab => (
                <Button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    isActive={activeTab === tab}
                    _active={{
                        bg: 'blue.500',
                        color: 'white'
                    }}
                    _hover={{
                        bg: 'blue.300',
                    }}
                    mr={2}
                >
                    {tab}
                </Button>
            ))}
        </Flex>
    );
};

export default Tabs;
