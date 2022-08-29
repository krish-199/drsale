import React from "react";
import { Box, Flex, Spinner, Text, Stack } from "@chakra-ui/react";

const PageLoader = () => {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Box>
        <Stack align={"center"}>
          <Spinner color="pink.300" />
          <Text>Loading...</Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default PageLoader;
