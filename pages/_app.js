import React, { useEffect, useState, useRef } from "react";
import useUser from "@/lib/use-user";
import { useRouter } from "next/router";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import LoginModal from "@/components/login-modal";
import PageLoader from "@/components/page-loader";

function MyApp({ Component, pageProps }) {
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();
  const isMounted = useRef(false);

  const [loginState, setLoginState] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMounted.current && user) {
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
      setIsLoading(false);
    }
    isMounted.current = true;
  }, [user]);

  const loginNavigate = () => router.push("/login");

  return (
    <ChakraProvider>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Component {...pageProps} />
          <LoginModal
            isOpen={loginState && router.pathname !== "/login"}
            action={loginNavigate}
            onClose={loginNavigate}
          />
        </>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
