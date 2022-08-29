import { React, useState, useEffect, useRef, useReducer } from "react";
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
  InputGroup,
  InputLeftAddon,
  Button,
  Select,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import SearchBar from "./search-bar";
import GridBreak from "./grid-break";
import Link from "next/link";
import style from "../styles/visitBox.module.css";
import ListPopup from "./list-popup";

const formReducer = (state, action) => {
  return { ...state, [action.field]: action.payload };
};

export default function VisitBox(props) {
  const router = useRouter();
  const prevRef = useRef("");
  const toast = useToast();

  let queryId = router.query.id;

  const [selected, setSelected] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [lastDetails, setLastDetails] = useState([]);

  const [isDisabled, setIsDisabled] = useState(true);

  const [peopleList, setPeopleList] = useState([]);

  const [formData, fromDispatch] = useReducer(formReducer, {});

  const handleTextChange = (e) => {
    fromDispatch({ field: e.target.name, payload: e.target.value });
  };

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
          fromDispatch({ field: "patient_id", payload: data._id });
          toast({
            title: "Patient details fetched",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        })
        .catch((err) => console.error(err));
      fetchLastDetails(queryId);
    }
    prevRef.current = queryId;
  }, [queryId]);

  useEffect(() => {
    if (selected && selected._id && selected._id.length > 0) {
      fetchLastDetails(selected._id);
      fromDispatch({ field: "patient_id", payload: selected._id });
      setIsDisabled(false);
    }
  }, [selected]);

  const fetchLastDetails = (pid, type = "patient_visit") => {
    fetch(`/api/lastDetails/${pid}/${type}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setLastDetails(data);
        toast({
          title: "Patient details fetched",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error while fetching",
          description: err,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  const fetchData = (searchId, searchValue) => {
    fetch("/api/search-user", {
      method: "POST",
      body: JSON.stringify({
        searchField: searchId.replace("replaceit", "name"),
        searchValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPeopleList(data))
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error while fetching",
          description: err,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    fetch("/api/visit", { method: "POST", body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: "Visit details have been saved",
          description: JSON.stringify(data),
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error while fetching",
          description: err,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
    props.updateKey();
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
                Let&apos;s see what can be added here!!
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
            onSubmit={handleSave}
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
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3]}
                  isDisabled={isDisabled}
                >
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
                    name="symptoms"
                    id="symptoms"
                    autoComplete="off"
                    // mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                    onChange={handleTextChange}
                  />
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 2]}
                  isDisabled={isDisabled}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Medicine Type
                  </FormLabel>
                  <Select
                    id="medicine_type"
                    name="medicine_type"
                    autoComplete="off"
                    placeholder="Select option"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                    onChange={handleTextChange}
                  >
                    <option>Allopathy</option>
                    <option>Homeopathy</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 1]}
                  isDisabled={isDisabled}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    BP (mmHG)
                  </FormLabel>
                  <Box w="fit-content" display="flex">
                    <Input
                      type="number"
                      name="bmax"
                      id="bmax"
                      autoComplete="off"
                      placeholder="max"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      input="U"
                      onChange={handleTextChange}
                    />
                    /
                    <Input
                      type="number"
                      name="bmin"
                      id="bmin"
                      autoComplete="off"
                      placeholder="min"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      input="U"
                      onChange={handleTextChange}
                    />
                  </Box>
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3]}
                  isDisabled={isDisabled}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Prescribed Medicine
                  </FormLabel>
                  <Input
                    type="text"
                    name="prescribed_medicine"
                    id="prescribed_medicine"
                    autoComplete="off"
                    // mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                    onChange={handleTextChange}
                  />
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3]}
                  isDisabled={isDisabled}
                >
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
                    name="differential_diagnosis"
                    id="differential_diagnosis"
                    autoComplete="off"
                    // mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                    onChange={handleTextChange}
                  />
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3]}
                  isDisabled={isDisabled}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Payment Mode
                  </FormLabel>
                  <Select
                    id="payment_mode"
                    name="payment_mode"
                    autoComplete="off"
                    placeholder="Select option"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    input="U"
                    onChange={handleTextChange}
                  >
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 2]}
                  isDisabled={isDisabled}
                  isRequired
                >
                  <FormLabel
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
                      type="number"
                      name="amount"
                      id="amount"
                      autoComplete="off"
                      // mt={1}
                      focusBorderColor="pink.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      placeholder="0.00"
                      onChange={handleTextChange}
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
                isDisabled={isDisabled}
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
