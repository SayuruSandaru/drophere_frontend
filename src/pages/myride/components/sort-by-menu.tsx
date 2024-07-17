import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, IconButton } from '@chakra-ui/react';
import { MdSort } from 'react-icons/md';

function SortByMenu({ onSortChange }) {
    return (
        <Menu>
            <MenuButton as={IconButton} icon={<MdSort />} variant="outline" colorScheme="blue" aria-label="Sort Options">
                Sort By
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => onSortChange('name')}>type</MenuItem>
                <MenuItem onClick={() => onSortChange('date')}>Date</MenuItem>
                <MenuItem onClick={() => onSortChange('price')}>Price</MenuItem>
                <MenuItem onClick={() => onSortChange('relevance')}>driver</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default SortByMenu;
