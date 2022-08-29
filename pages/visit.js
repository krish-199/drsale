import React, { useState } from "react";
import VisitBox from "@/components/visit-box";
import { Box, useColorModeValue } from "@chakra-ui/react";
import styles from "../styles/visit.module.css";

const Visit = () => {
  const [mountKey, setMountKey] = useState(Math.random());

  const updateKey = () => setMountKey(Math.random());

  return (
    <div className={styles.contianer}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <VisitBox key={mountKey} updateKey={updateKey} />
      </Box>
    </div>
  );
};

export default Visit;
