import * as React from "react";

const Field: React.FC = ({ children }) => {
  return (
    <svg width="150" height="150">
      {children}
    </svg>
  );
};

export default Field;
