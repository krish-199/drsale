import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function GridBreak() {
  return (
    <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
      <Box py={5}>
        <Box
          borderTop="solid 1px"
          borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
        ></Box>
      </Box>
    </Box>
  );
}
