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

import SearchBar from "./search-bar";

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
      <SimpleGrid
        display={{ base: "initial", md: "grid" }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridItem colSpan={{ md: 1 }}>
          <Box px={[4, 0]}>
            <Stack>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Personal Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Use a permanent address where you can receive mail.
              </Text>
              <Box
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
              >
                <List>
                  <li>Hi</li> <li>Bye</li>
                </List>
              </Box>
            </Stack>
          </Box>
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, "md"]}
            overflow={{ sm: "hidden" }}
          >
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg={useColorModeValue("white", "gray.700")}
              spacing={6}
            >
              <SimpleGrid
                columns={6}
                spacing={6}
                onChange={(p) => {
                  console.log(
                    "Print main box",
                    p,
                    p.target.value,
                    p.target.id,
                    p.target.name,
                    peopleList,
                    peopleList.length
                  );
                  if (p.target.value.length > 2 && !peopleList.length > 0)
                    fetchData(p.target.id, p.target.value);
                }}
              >
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="first_name"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    First name
                  </FormLabel>
                  <SearchBar
                    options={peopleList}
                    selected={selected}
                    handleSelected={setSelected}
                    handleCreation={setCreated}
                    inputName={"first"}
                    inputField={"name"}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="last_name"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Last name
                  </FormLabel>
                  <SearchBar
                    options={peopleList}
                    selected={selected}
                    handleSelected={setSelected}
                    handleCreation={setCreated}
                    inputName={"lemail"}
                    inputField={"email"}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 6]}>
                  <FormLabel
                    htmlFor="email_address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Phone Number
                  </FormLabel>
                  <SearchBar
                    options={peopleList}
                    selected={selected}
                    handleSelected={setSelected}
                    handleCreation={setCreated}
                    inputName={"email"}
                    inputField={"email"}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="gender"
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
                    htmlFor="age"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Age
                  </FormLabel>
                  <Input
                    type="text"
                    name="age"
                    id="age"
                    autoComplete="off"
                    // mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={6}>
                  <FormLabel
                    htmlFor="address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Address
                  </FormLabel>
                  <Input
                    type="text"
                    name="address"
                    id="address-replaceit"
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
                disabled={!isCreated}
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
