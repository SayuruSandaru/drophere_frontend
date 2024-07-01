import React from 'react';
import { Box, Text, Divider, Avatar, Flex } from "@chakra-ui/react";
import Rating from 'react-rating';
import { MdStar } from 'react-icons/md';

const ReviewItem = ({ name, comment, rating }) => {
    return (
        <Box>
            <Flex>
                <Avatar size="sm" mr={2} />
                <Text mt={1}><b>{name}</b></Text></Flex>
            <Text mb={3} mt={2}>{comment}</Text>
            <Flex>
                <Rating
                    readonly
                    initialRating={rating}
                    emptySymbol={<MdStar size={20} color="gray" />}
                    fullSymbol={<MdStar size={20} color="gold" />}
                />
                <Text ml={1} fontSize={"sm"}>{rating}</Text>
            </Flex>
            <Divider mt={3} />
        </Box>
    );
};

export default ReviewItem;