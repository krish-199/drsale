import React, { useEffect } from "react";
import useUser from "@/lib/use-user";
import { useRouter } from "next/router";
import VisitBox from "@/components/visit-box";
import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import styles from "../styles/visit.module.css";

const Visit = () => {
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    user?.isLoggedIn
      ? null
      : toast({
          title: "Not logged in",
          description: "You are logged in. Please login to continue",
          status: "error",
          duration: 3000,
          isClosable: false,
        }) && router.push("/login");
  }, [user, router, toast]);

  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <VisitBox />
      </Box>
    </div>
  );
};

export default Visit;
