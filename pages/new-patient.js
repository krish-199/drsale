import Profile from "@/components/profile";
import useUser from "@/lib/use-user";
import { useRouter } from "next/router";
import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/visit.module.css";
import LoginModal from "@/components/login-modal";

const NewPatient = () => {
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();

  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
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
  }, [user]);

  const loginNavigate = () => router.push("/login");

  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <Profile />
      </Box>
      <LoginModal
        isOpen={loginState}
        action={loginNavigate}
        onClose={loginNavigate}
      />
    </div>
  );
};

export default NewPatient;
