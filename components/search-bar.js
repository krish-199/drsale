import React from "react";

import { CreatableSelect } from "chakra-react-select";

export default function SearchBar(props) {
  const chakraStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      bg: "transparent",
    }),
    control: (provided, state) => ({
      ...provided,
      rounded: "md",
      shadow: "sm",
      // mt: 1,
      h: 8,
    }),
    container: (provided, state) => ({
      ...provided,
      pt: 1,
      h: 8,
    }),
  };
  return (
    <CreatableSelect
      name={`${props.inputName}-name`}
      id={`${props.inputName}-${props.inputName.length}`}
      inputId={`${props.inputName}-replaceit`}
      instanceId={`${props.inputName}-value`}
      autoComplete="off"
      isLoading={!(props.options.length > 0)}
      allowCreateWhileLoading
      getNewOptionData={(inputValue, optionLabel) => ({
        [props.inputField]: optionLabel,
        // id: inputValue,
        __isNew__: true,
      })}
      options={(props.options.length > 0 && props.options) || []}
      noOptionsMessage={"Please enter atleast 2 letters..."}
      // key={JSON.stringify(peopleList.length)}
      chakraStyles={chakraStyles}
      focusBorderColor="pink.400"
      errorBorderColor="red.500"
      tagVariant="outline"
      selectedOptionStyle="check"
      selectedOptionColor="pink"
      colorScheme="purple"
      placeholder={`Select ${props.inputName} Name...`}
      closeMenuOnSelect={true}
      getOptionLabel={(option) => option[props.inputField]}
      getOptionValue={(option) => option._id}
      value={props.selected}
      size="sm"
      onChange={(e) => {
        props.handleSelected(e);
      }}
      onCreateOption={(e) => {
        props.handleCreation(true);
        props.handleSelected({ ...props.selected, [props.inputName]: e });
      }}
    />
  );
}
