import React from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { MdMoreVert, MdDriveEta, MdNavigation } from 'react-icons/md';

const ActionMenu = ({ onStart, onDecline }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdMoreVert />}
        variant="outline"
        onClick={onOpen}
      />
      <MenuList>
        <MenuItem icon={<MdNavigation />} onClick={() => {
          onClose();
          onStart();
        }}>
          View ride
        </MenuItem>
        <MenuItem icon={<MdDriveEta />} onClick={() => {
          onClose();
          onDecline();
        }}>
          View driver
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
