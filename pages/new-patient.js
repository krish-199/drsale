import Profile from "@/components/profile";
import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/visit.module.css";

const NewPatient = () => {
  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <Profile />
      </Box>
    </div>
  );
};

export default NewPatient;
