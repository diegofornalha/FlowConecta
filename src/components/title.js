import React from "react";

// Title component
const Title = ({ children }) => {
  return (
    <h1 className="mx-auto p-0 uppercase w-11/12 text-center text-5xl">
      {children}
    </h1>
  );
};

// Optional export
export default Title;
