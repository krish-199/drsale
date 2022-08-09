import { React, useState } from "react";
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
  List,
  color,
} from "@chakra-ui/react";
import GridBreak from "./grid-break";

export default function Profile(props) {
  const [selected, setSelected] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

  const [isCreated, setCreated] = useState(false);
  const [peopleList, setPeopleList] = useState([]);

  const fetchData = (searchId, searchValue) => {
    console.log("print search val", searchId, searchValue);
    fetch("/api/search-user", {
      method: "POST",
      body: JSON.stringify({ searchField: "name", searchValue: "jo" }),
    })
      .then((res) => res.json())
      .then((data) => setPeopleList(data))
      .catch((err) => console.error(err));
  };

  return (
    <Box mt={[10, 0]}>
      <GridBreak />
      <SimpleGrid
        display={{ base: "initial", md: "grid" }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridItem colSpan={{ md: 1 }}>
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              New Patient Info
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Use a permanent address where you can receive mail.
            </Text>
          </Box>
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, "md"]}
            overflow={{ sm: "hidden" }}
            autoComplete="off"
          >
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg={useColorModeValue("white", "gray.700")}
              spacing={6}
            >
              <SimpleGrid columns={6} spacing={6}>
                <FormControl as={GridItem} colSpan={[6, 2]} autoComplete="off">
                  <Input
                    autoComplete="off"
                    name="hidden"
                    type="text"
                    role="presentation"
                    style={{ display: "none" }}
                  />
                  <FormLabel
                    // htmlFor="first_name"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    First name
                  </FormLabel>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 2]} autoComplete="off">
                  <Input
                    autoComplete="off"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <FormLabel
                    // htmlFor="last_name"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Last name
                  </FormLabel>
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 2]} autoComplete="off">
                  <Input
                    autoComplete="off"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Number
                  </FormLabel>
                  <InputGroup size="sm" mt={1}>
                    <InputLeftAddon rounded="md" children="+91" />
                    <Input
                      type="tel"
                      name="pn"
                      id="pn"
                      autoComplete="off"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl as={GridItem} colSpan={6}>
                  <FormLabel
                    // htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    History
                  </FormLabel>
                  <Input
                    type="text"
                    name="adrs"
                    id="adrs"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3, null, 2]} mt={1}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Gender
                  </FormLabel>
                  <Select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    placeholder="Select option"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Age
                  </FormLabel>
                  <Input
                    type="text"
                    name="adrs"
                    id="adrs"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Reffered By
                  </FormLabel>
                  <Input
                    type="text"
                    name="adrs"
                    id="adrs"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>
                <FormControl as={GridItem} colSpan={6}>
                  <FormLabel
                    // htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Adress
                  </FormLabel>
                  <Input
                    type="text"
                    name="adrs"
                    id="adrs"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>
              </SimpleGrid>
            </Stack>
            <Box
              px={{ base: 4, sm: 6 }}
              py={3}
              bg={useColorModeValue("gray.50", "gray.900")}
              textAlign="right"
            >
              <Button
                type="submit"
                colorScheme="pink"
                _focus={{ shadow: "" }}
                fontWeight="md"
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>
      <GridBreak />
    </Box>
  );
}
