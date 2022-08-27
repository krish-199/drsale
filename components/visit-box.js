import { React, useState, useEffect, useRef } from "react";
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
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  color,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import SearchBar from "./search-bar";
import GridBreak from "./grid-break";
import Link from "next/link";
import style from "../styles/visitBox.module.css";
import ListPopup from "./list-popup";

export default function VisitBox(props) {
  const router = useRouter();
  const prevRef = useRef("");

  let queryId = router.query.id;

  const [selected, setSelected] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [lastDetails, setLastDetails] = useState([]);

  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    if (queryId && prevRef.current !== queryId) {
      fetch(`/api/getUser/${queryId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setPeopleList([data]);
          setSelected({
            _id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
          });
        })
        .catch((err) => console.error(err));
      fetchLastDetails(queryId);
    }
    prevRef.current = queryId;
  }, [queryId]);

  useEffect(() => {
    if (
      selected &&
      selected._id &&
      selected._id.length > 0 &&
      prevRef.current !== selected._id &&
      lastDetails.length > 0
    ) {
      fetchLastDetails(selected._id);
    }
    prevRef.current = selected && selected._id ? selected._id : "";
  }, [selected]);

  const fetchLastDetails = (pid, type = "patient_visit") => {
    fetch(`/api/lastDetails/${pid}/${type}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("print data", data);
        setLastDetails(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchData = (searchId, searchValue) => {
    console.log("print search val", searchId, searchValue);
    fetch("/api/searchUser", {
      method: "POST",
      body: JSON.stringify({
        searchField: searchId.replace("replaceit", "name"),
        searchValue,
      }),
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
                <Link href="/new-patient">
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
                  bg={useColorModeValue("snow", "slategrey")}
                  spacing={6}
                  shadow="lg"
                  rounded="md"
                  h={"fit-content"}
                  maxH={"300px"}
                  overflowY={"auto"}
                >
                  <List spacing={3}>
                    {lastDetails && lastDetails.length > 0 ? (
                      lastDetails.map((d) => (
                        <ListItem key={d._id}>
                          <ListPopup data={d} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>No last visits to show</ListItem>
                    )}
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
                  if (p.target.value.length > 2 && !peopleList.length > 0)
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
                    inputName={"first"}
                    inputField={"first_name"}
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
                    inputName={"last"}
                    inputField={"last_name"}
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 2]}>
                  <FormLabel
                    htmlFor="phone"
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
                    inputName={"phone"}
                    inputField={"phone"}
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
                onClick={handleSave}
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
