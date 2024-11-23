import React from "react";

const Container = ({ children }) => {
  return <div className="mx-auto mt-6 w-4/5 text-center">{children}</div>;
};

const Subtitle = ({ children }) => {
  return <h2 className="text-2xl">{children}</h2>;
};

export { Container, Subtitle };

