import React from "react";

export const Form = ({ children, title }) => {
  return (
    <section className="flex items-center  flex-col gap-3 mt-20">
      <h2 className="text-3xl">{title}</h2>
      <form className="form flex justify-center flex-col gap-2 items-baseline">
        {children}
      </form>
    </section>
  );
};
