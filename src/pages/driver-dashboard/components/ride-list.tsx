import { Box, Button, ButtonGroup, Flex, IconButton, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { MdDelete } from 'react-icons/md';
import React from "react";
import CustomAlertDialog from "./alert-dialog";

const RideListTable = () => {
    const { isOpen: isOpenDecline, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();
    const header = ["From", "To", "Date", "Actions"];
    const data = [
        {
            from: "Badulla",
            to: "Colombo",
            date: "2021-09-01",
        },
        {
            from: "Anuradhapura",
            to: "Kandy",
            date: "2021-09-02",
        },
        {
            from: "Kandy",
            to: "Galle",
            date: "2021-09-03",
        },
        {
            from: "Badulla",
            to: "Colombo",
            date: "2021-09-04",
        },
    ];
    const color1 = useColorModeValue("gray.400", "gray.400");
    const color2 = useColorModeValue("gray.400", "gray.400");
    return (
        <Box >
            <Flex
                w="full"
                bg="#edf3f8"
                _dark={{
                    bg: "#3e3e3e",
                }}
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Table
                    w="full"
                    bg="white"
                    _dark={{
                        bg: "gray.800",
                    }}
                    display={{
                        base: "block",
                        md: "table",
                    }}
                    sx={{
                        "@media print": {
                            display: "table",
                        },
                    }}
                >
                    <Thead
                        display={{
                            base: "none",
                            md: "table-header-group",
                        }}
                        sx={{
                            "@media print": {
                                display: "table-header-group",
                            },
                        }}
                    >
                        <Tr>
                            {header.map((x) => (
                                <Th key={x}>{x}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody
                        display={{
                            base: "block",
                            lg: "table-row-group",
                        }}
                        sx={{
                            "@media print": {
                                display: "table-row-group",
                            },
                        }}
                    >
                        {data.map((token, tid) => {
                            return (
                                <Tr
                                    key={tid}
                                    display={{
                                        base: "grid",
                                        md: "table-row",
                                    }}
                                    sx={{
                                        "@media print": {
                                            display: "table-row",
                                        },
                                        gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                                        gridGap: "10px",
                                    }}
                                >
                                    {Object.keys(token).map((x) => {
                                        return (
                                            <React.Fragment key={`${tid}${x}`}>
                                                <Td
                                                    display={{
                                                        base: "table-cell",
                                                        md: "none",
                                                    }}
                                                    sx={{
                                                        "@media print": {
                                                            display: "none",
                                                        },
                                                        textTransform: "uppercase",
                                                        color: color1,
                                                        fontSize: "xs",
                                                        fontWeight: "bold",
                                                        letterSpacing: "wider",
                                                        fontFamily: "heading",
                                                    }}
                                                >
                                                    {x}
                                                </Td>
                                                <Td
                                                    color={"gray.500"}
                                                    fontSize="md"
                                                    fontWeight="light"
                                                >
                                                    {token[x]}
                                                </Td>
                                            </React.Fragment>
                                        );
                                    })}
                                    <Td
                                        display={{
                                            base: "table-cell",
                                            md: "none",
                                        }}
                                        sx={{
                                            "@media print": {
                                                display: "none",
                                            },
                                            textTransform: "uppercase",
                                            color: color2,
                                            fontSize: "xs",
                                            fontWeight: "bold",
                                            letterSpacing: "wider",
                                            fontFamily: "heading",
                                        }}
                                    >
                                        Actions
                                    </Td>
                                    <Td>
                                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<MdDelete />}
                                                colorScheme="red"
                                                onClick={onOpenDecline} />
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Flex>
            <CustomAlertDialog mainBtnText={"Delete"} primaryColor={"red"} title={"Decline request"} message={"Are you sure you want to decline this request"} isOpen={isOpenDecline} onClose={onCloseDecline} onVerify={() => { }} />
        </Box >
    );
};

export default RideListTable;