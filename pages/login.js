import { useState } from "react";
import useUser from "@/lib/useUser";
// layout for page
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  CircularProgress,
} from "@chakra-ui/react";
import ErrorMessage from "@/components/error-message";
import fetchJson from "@/lib/fetchJson";

export default function SimpleCard() {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      mutateUser(
        await fetchJson("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              {errorMsg && <ErrorMessage message={errorMsg} />}
              <FormControl isRequired id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="admin@example.com" />
              </FormControl>
              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="********" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

// export default function Login() {

//   const { mutateUser } = useUser({
//     redirectTo: '/',
//     redirectIfFound: true,
//   });

//   const [errorMsg, setErrorMsg] = useState('');

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const body = {
//       email: e.currentTarget.email.value,
//       password: e.currentTarget.password.value
//     };

//     try {
//       mutateUser(
//         await fetchJson('/api/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(body),
//         })
//       );
//     } catch (error) {
//       console.error('An unexpected error happened:', error);
//       setErrorMsg(error.data.message);
//     }
//   }
//   return (
//     <>
//       <LoginLayout>
//         <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit}></Form>
//       </LoginLayout>
//     </>
//   );
// }