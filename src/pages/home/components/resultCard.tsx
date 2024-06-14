import { Box, Stack, Flex, Text, Image, Icon, Badge, Spacer } from "@chakra-ui/react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

interface CarInfoProps {
    imageUrl: string;
    altText: string;
    carName: string;
    date: string;
    from: string;
    to: string;
    availability: string;
    seatsLeft: string;
    price: string;
    onClick: () => void
}

const CarInfo: React.FC<CarInfoProps> = ({ imageUrl, altText, carName, date, from, to, availability, seatsLeft, price, onClick }) => {
    return (
        <Box borderRadius="md" borderWidth="1px" p={4} onClick={onClick}>
            <Flex direction={{ base: "column", md: "row" }}>
                <Image
                    boxSize={{ base: "100%", md: "144px" }}
                    objectFit="cover"
                    borderRadius={"md"}
                    m={{ base: "auto", md: 5 }}
                    src={imageUrl}
                    alt={altText}
                />
                <Box m={4}>
                    <Stack spacing={2}>
                        <Text fontSize="lg">
                            <Box as="span" fontWeight="bold">{carName}</Box> drive by cooper23
                        </Text>

                        <Text fontSize="sm">{date}</Text>
                        <Text fontSize="sm" mb={1}>From: {from}</Text>
                        <Text fontSize="sm" mb={1}>To: {to}</Text>

                        <Flex align="center">
                            <Badge colorScheme="green" w={75}>{availability}</Badge>
                            <Box ml={2} />
                            <Icon as={MdAirlineSeatReclineExtra} w={4} h={4} color="gray.500" mt={0} />
                            <Text ml={2}>{seatsLeft} seats left</Text>
                        </Flex>
                    </Stack>
                </Box>
                <Spacer />
                <Text fontSize="xl" fontWeight="bold" m={{ base: 4, md: 5 }}>{price}</Text>
            </Flex>
        </Box>
    );
};

export default CarInfo;
