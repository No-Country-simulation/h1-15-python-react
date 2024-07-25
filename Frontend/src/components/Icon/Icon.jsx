import React from "react";
import { Icons } from "../../utils/Icons";

// eslint-disable-next-line react/prop-types
const Icon = ({ name }) => {
  const icon = Icons[name];

  if (!icon) return null;

  return React.cloneElement(icon);
};

export default Icon;
