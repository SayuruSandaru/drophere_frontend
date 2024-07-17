'use client'

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Image,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi'

import { MdBikeScooter } from 'react-icons/md'
import { IconType } from 'react-icons'
import MobileNav from './components/mobile-nav'
import { Link } from 'react-router-dom'
import { RouterPaths } from 'router/routerConfig'

interface LinkItemProps {
    name: string
    icon: IconType
    path: string
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}


interface SidebarProps extends BoxProps {
    onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, path: RouterPaths.DASHBOARDHOME },
    { name: 'Requests', icon: FiTrendingUp, path: RouterPaths.DASHBOARDREQUESTS },
    { name: 'Rides', icon: MdBikeScooter, path: RouterPaths.DASHBOARDRIDES },
    // { name: 'Favourites', icon: FiStar },
    // { name: 'Settings', icon: FiSettings },
]

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Box display={"flex"}>
                    <Image src="/images/Black_T.png" alt="logo" height={"55"} />
                    <Text fontSize="xl" mt={"4"}>Drophere</Text>
                </Box>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, children, path, ...rest }) => {
    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'teal.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Box
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default SidebarContent;