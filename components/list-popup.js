import React, { useState } from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import CustomModal from "./modal";
import style from "../styles/listPopup.module.css";

const ListPopup = ({ data }) => {
  const [modalState, setModalState] = useState(false);

  const closeModal = () => {
    setModalState(false);
  };

  const getModal = () => {
    return (
      <CustomModal
        header={`Date is: ${new Date(data.date).toLocaleString()}`}
        isOpen={modalState}
        onClose={closeModal}
        secRemove={true}
      >
        <div className={style.modalBody}>
          {Object.keys(data).map((e) => {
            if (e.includes("_id") || e.includes("date")) return "";
            return (
              <span className={style.textDiv}>
                <div className={style.keyText}>{e}:</div>
                <p className={style.valueText}>{data[e]}</p>
              </span>
            );
          })}
        </div>
      </CustomModal>
    );
  };

  return (
    <div
      className={style.listStyle}
      onClick={(e) => e.preventDefault && setModalState(true)}
    >
      {getModal()}
      &nbsp;Date:&nbsp;{new Date(data.date).toLocaleDateString()}
      &nbsp;&nbsp;|&nbsp;&nbsp;Medicine:&nbsp;{data.prescribed_medicine}
    </div>
  );
};

export default ListPopup;
