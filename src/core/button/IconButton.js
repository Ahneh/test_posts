import { Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";
import { ICONS } from "../icon/icons";

import React from "react";
import c from "./IconButton.module.css";

const IconButton = ({ className, onClick, title, icon, color }) => (
  <Tooltip title={title} placement='top'>
    <button className={`${className} ${c.button_icon}`} onClick={onClick}>
      {ICONS[icon](color)}
    </button>
  </Tooltip>
);

IconButton.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
};

IconButton.defaultProps = {
  className: "",
  onClick: null,
  title: "",
  icon: "",
};

export default IconButton;
