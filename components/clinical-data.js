import { React, useState } from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import SearchBar from "./search-bar";
import GridBreak from "./grid-break";

export default function TestComponent() {
  const [selected, setSelected] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

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
      <chakra.form
        method="POST"
        shadow="base"
        rounded={[null, "md"]}
        overflow={{ sm: "hidden" }}
      >
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
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue("white", "gray.700")}
            spacing={6}
            shadow="sm"
            rounded="md"
          >
            <SimpleGrid
              columns={{ md: 3 }}
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
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
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
                  inputName={"first"}
                  inputField={"name"}
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
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
                  inputName={"lemail"}
                  inputField={"email"}
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
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
                  inputName={"email"}
                  inputField={"email"}
                />
              </FormControl>
            </SimpleGrid>
          </Stack>
        </Stack>
        <GridBreak />
        <Stack>
          <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
            Clinical Information
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Enter Clinical data
          </Text>

          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue("white", "gray.700")}
            spacing={6}
            shadow="sm"
            rounded="md"
          >
            <SimpleGrid
              columns={{ md: 3 }}
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
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue("gray.700", "gray.50")}
                >
                  Complain
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
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
                <FormLabel
                  htmlFor="first_name"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue("gray.700", "gray.50")}
                >
                  Symptoms
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
              <FormControl as={GridItem} colSpan={{ md: 1 }}>
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
                  inputName={"email"}
                  inputField={"email"}
                />
              </FormControl>
            </SimpleGrid>
          </Stack>
        </Stack>
      </chakra.form>
    </Box>
  );
}
