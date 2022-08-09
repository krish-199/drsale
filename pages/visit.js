import React from "react";
import VisitBox from "@/components/visit-box";
import { Box, useColorModeValue } from "@chakra-ui/react";
import styles from "../styles/visit.module.css";

const visit = () => {
  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <VisitBox />
      </Box>
    </div>
  );
};

export default visit;
