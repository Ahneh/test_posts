import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

import React from "react";
import c from "./CustomTextField.module.css";

export const CustomTextField = ({
  className,
  classNameBox,
  onChange,
  id,
  value,
  label,
  rowsMax,
  rows,
  variant,
  size,
}) => (
  <div className={classNameBox}>
    <TextField
      className={`${className} ${c.input}`}
      onChange={onChange}
      id={id}
      value={value}
      label={label}
      rowsMax={rowsMax}
      rows={rows}
      multiline
      variant={variant}
      size={size}
    />
  </div>
);

CustomTextField.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
  ]),
  classNameBox: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  rowsMax: PropTypes.number,
  rows: PropTypes.number,
  variant: PropTypes.string,
  size: PropTypes.string,
};

CustomTextField.defaultProps = {
  className: "",
  onChange: null,
  id: "",
  value: "",
  label: "",
  rowsMax: 1,
  rows: 1,
  variant: "outlined",
  size: "medium",
};
