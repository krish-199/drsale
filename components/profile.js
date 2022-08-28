import { React, useState } from "react";
import { useRouter } from "next/router";
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
} from "@chakra-ui/react";
import GridBreak from "./grid-break";
import Link from "next/link";
import style from "../styles/visitBox.module.css";
import WarningCard from "./warning-card";
import CustomModal from "./modal";

export default function Profile() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    reffered_by: "",
    history: "",
  });

  const [patientId, setPatientId] = useState("");

  const [modalState, setModalState] = useState(false);

  const fetchData = () => {
    fetch("/api/new-patient", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userExist) {
          setModalState(true);
          setPatientId(data.patientId.toString());
        } else
          router.push({ pathname: "/visit", query: { id: data.patientId } });
      })
      .catch((err) => console.error(err));
  };

  const modalAction = () => {
    if (patientId.length > 0)
      router.push({ pathname: "/visit", query: { id: patientId } });
  };

  const closeModal = () => {
    setModalState(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const getModal = () => {
    return (
      <CustomModal
        header={"Patient info already exists!!!"}
        isOpen={modalState}
        onClose={closeModal}
        secText={"Continue..."}
        secAction={modalAction}
      >
        <>
          <p>
            Patient details trying to add already exist in the records, do you
            still want to proceed ?
          </p>
          <WarningCard text={"On continuing will use previous records"} />
        </>
      </CustomModal>
    );
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
            <Stack>
              <Stack direction={"row"}>
                <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                  New Patient Info
                </Heading>
                <Link href="/visit">
                  <a className={style.linkText}>Record a new visit ?</a>
                </Link>
              </Stack>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Add new patient details.
              </Text>
            </Stack>
          </Box>
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, "md"]}
            overflow={{ sm: "hidden" }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg={useColorModeValue("white", "gray.700")}
              spacing={6}
            >
              <SimpleGrid columns={6} spacing={6}>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 2]}
                  isRequired
                  autoComplete="off"
                >
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                  />
                </FormControl>

                <FormControl
                  as={GridItem}
                  colSpan={[6, 2]}
                  isRequired
                  autoComplete="off"
                >
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 2]} autoComplete="off">
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Number
                  </FormLabel>
                  <InputGroup size="sm" mt={1}>
                    <InputLeftAddon rounded="md">+91</InputLeftAddon>
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
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
                    name="history"
                    id="history"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        history: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 2]}
                  mt={1}
                  isRequired
                >
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
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
                    type="number"
                    name="age"
                    id="age"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
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
                    name="reffered_by"
                    id="reffered_by"
                    autoComplete="off"
                    mt={1}
                    focusBorderColor="pink.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        reffered_by: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
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
      {getModal()}
    </Box>
  );
}
