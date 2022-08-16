import { Box, chakra, Flex, Icon } from "@chakra-ui/react";
import React from "react";

const WarningCard = ({ text }) => {
  return (
    <Box pt={3}>
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="md"
        rounded="lg"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          w={12}
          bg="yellow.500"
        >
          <Icon color="white" boxSize={6} />
        </Flex>
        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color="yellow.400"
              _dark={{
                color: "yellow.300",
              }}
              fontWeight="bold"
            >
              Warning
            </chakra.span>
            <chakra.p
              color="gray.600"
              _dark={{
                color: "gray.200",
              }}
              fontSize="sm"
            >
              {text}
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default WarningCard;
