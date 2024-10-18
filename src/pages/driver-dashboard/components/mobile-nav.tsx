import { Avatar, Button, Box, Flex, useColorModeValue, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, FlexProps } from "@chakra-ui/react"
import User from "model/user"
import { FiBell, FiChevronDown, FiMenu, FiPlus } from "react-icons/fi"

interface MobileProps extends FlexProps {
    onOpen: () => void
}


const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    {/* <Box mr={'10'}>
                        <Menu>
                            <MenuButton fontSize="sm" fontWeight={"medium"} color="gray.600" as={Button} bgColor={"white"} rightIcon={<FiPlus />}>
                                Add
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Add vehicle</MenuItem>
                                <MenuItem>Add ride</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box> */}
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        User.getProfileImage()
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{User.getUserName()}</Text>
                                </VStack>
                                {/* <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box> */}
                            </HStack>
                        </MenuButton>

                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default MobileNav;