import { useRef, useState } from "react";
import { Form } from "../../components/Form/Form";
import "./LoginForm.css";
import { UsersList } from "../../classes/UsersList";

export const LoginForm = () => {
  const usernameRef = useRef(null);
  const contraseñaRef = useRef(null);
  const references = [usernameRef, contraseñaRef];
  const userList = new UsersList();

  const login = (e) => {
    e.preventDefault();
    console.log("username: ", usernameRef.current.value);
    console.log("contraseña: ", contraseñaRef.current.value);
    const emptyField = references.some((ref) => ref.current.value === "");

    if (emptyField) {
      alert("Todos los campos deben estar completos");
      references.forEach((ref) => {
        ref.current.style.border = "1px solid red";
      });

      setTimeout(() => {
        references.forEach((ref) => {
          ref.current.style.border = "1px solid black";
        });
      }, 2000);

      return;
    }

    const user = userList.loginUser(
      usernameRef.current.value,
      contraseñaRef.current.value
    );

    if (!user) {
      references.forEach((ref) => {
        ref.current.style.border = "1px solid red";
      });

      setTimeout(() => {
        references.forEach((ref) => {
          ref.current.style.border = "1px solid black";
        });
      }, 2000);
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    if (user) {
      document.location = "/";
    }
  };

  return (
    <section className="flex items-center justify-center">
      <Form title={"Iniciar Sesion"}>
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={usernameRef}
        />
        <input
          type="text"
          placeholder="Ingresar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={contraseñaRef}
        />
        <button
          className="block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer w-75 text-center"
          onClick={login}
        >
          Ingresar
        </button>
      </Form>
    </section>
  );
};
