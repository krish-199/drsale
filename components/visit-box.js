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
  Switch,
} from "@chakra-ui/react";

import SearchBar from "./search-bar";
import GridBreak from "./grid-break";
import Link from "next/link";
import style from "../styles/visitBox.module.css";

export default function VisitBox(props) {
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
    fetch("/api/searchUser", {
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
          <Box px={[0, 0]}>
            <Stack>
              <Stack direction={"row"}>
                <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                  Patient Visit
                </Heading>
                <Link href="new-patient">
                  <a className={style.linkText}>New Patient ?</a>
                </Link>
              </Stack>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Let's see what can be added here!!
              </Text>
              <GridBreak />

              <Stack>
                <Text
                  mt={-1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Last Visits
                </Text>
                <Box
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue("pink.200", "cyan.900")}
                  spacing={6}
                  shadow="sm"
                  rounded="md"
                >
                  {/* Below will be the list of recent visits collapsed when opened, further details will be shown */}
                  <List>
                    <li>Hi</li> <li>Bye</li>
                  </List>
                </Box>
              </Stack>
              <GridBreak />
              <Stack>
                <Text
                  mt={-1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Last Prescribed Medicine
                </Text>
                <Box
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue("blue.200", "teal.900")}
                  spacing={6}
                  shadow="sm"
                  rounded="md"
                >
                  {/* Below will be the list of recent visits collapsed when opened, further details will be shown */}
                  <List>
                    <li>Hi</li> <li>Bye</li>
                  </List>
                </Box>
              </Stack>
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
                  if (
                    !newPnt &&
                    p.target.value.length > 2 &&
                    !peopleList.length > 0
                  )
                    fetchData(p.target.id, p.target.value);
                }}
              >
                <FormControl as={GridItem} colSpan={[6, 2]}>
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

                <FormControl as={GridItem} colSpan={[6, 2]}>
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

                <FormControl as={GridItem} colSpan={[6, 2]}>
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
                    htmlFor="age"
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
                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Medicine Type
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
                    <option>Allopathy</option>
                    <option>Homeopathy</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3, null, 1]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    BP (mmHG)
                  </FormLabel>
                  <Box w="fit-content" display="flex">
                    <Input
                      type="text"
                      name="age"
                      id="age"
                      autoComplete="off"
                      placeholder="min"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      input="U"
                    />
                    /
                    <Input
                      type="text"
                      name="age"
                      id="age"
                      autoComplete="off"
                      placeholder="max"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      input="U"
                    />
                  </Box>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="age"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Prescribed Medicine
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
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="age"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Differential Diagnosis
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
                <FormControl as={GridItem} colSpan={[6, 3]}>
                  <FormLabel
                    htmlFor="address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Payment Mode
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
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    htmlFor="address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Amount
                  </FormLabel>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      bg={useColorModeValue("gray.50", "gray.800")}
                      color={useColorModeValue("gray.500", "gay.50")}
                      rounded="md"
                    >
                      Rs.
                    </InputLeftAddon>
                    <Input
                      type="text"
                      name="address"
                      id="address-replaceit"
                      autoComplete="off"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      placeholder="0.00"
                    />
                  </InputGroup>
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
      <GridBreak />
    </Box>
  );
}
