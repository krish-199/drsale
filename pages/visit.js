import React, { useEffect, useState } from "react";
import useUser from "@/lib/use-user";
import { useRouter } from "next/router";
import VisitBox from "@/components/visit-box";
import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import styles from "../styles/visit.module.css";
import LoginModal from "@/components/login-modal";

const Visit = () => {
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();

  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    user?.isLoggedIn
      ? setLoginState(false) &&
        toast({
          title: "Logged In",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      : toast({
          title: "Not logged in",
          description: "You are logged in. Please login to continue",
          status: "error",
          duration: 3000,
          isClosable: false,
        }) && setLoginState(true);
  }, [user]);

  const loginNavigate = () => router.push("/login");

  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <VisitBox />
      </Box>
      <LoginModal
        isOpen={loginState}
        action={loginNavigate}
        onClose={loginNavigate}
      />
    </div>
  );
};

export default Visit;
