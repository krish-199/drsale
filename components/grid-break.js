import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

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
