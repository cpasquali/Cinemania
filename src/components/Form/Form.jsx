import React from "react";

export const Form = ({ children, title }) => {
  return (
    <section className="flex items-center  flex-col gap-3 mt-20">
      <h2 className="text-3xl">{title}</h2>
      <form className="flex items-center justify-center flex-col gap-2">
        {children}
      </form>
    </section>
  );
};
