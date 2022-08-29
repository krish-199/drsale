import React, { useEffect, useState, useRef } from "react";
import useUser from "@/lib/use-user";
import { useRouter } from "next/router";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import LoginModal from "@/components/login-modal";

function MyApp({ Component, pageProps }) {
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();
  const isMounted = useRef(false);

  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (isMounted.current)
      user?.isLoggedIn
        ? toast({
            title: "Logged In",
            status: "success",
            duration: 2000,
            isClosable: true,
          }) && setLoginState(false)
        : toast({
            title: "Not logged in",
            description: "You are logged in. Please login to continue",
            status: "error",
            duration: 3000,
            isClosable: false,
          }) && setLoginState(true);
    isMounted.current = true;
  }, [user]);

  const loginNavigate = () => router.push("/login");

  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <LoginModal
        isOpen={loginState && router.pathname !== "/login"}
        action={loginNavigate}
        onClose={loginNavigate}
      />
    </ChakraProvider>
  );
}

export default MyApp;
