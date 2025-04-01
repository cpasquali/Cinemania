import { useState } from "react";
import { Form } from "../../components/Form/Form";
import "./LoginForm.css";
import { UsersList } from "../../classes/UsersList";
import { Link } from "wouter";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const userList = new UsersList();

  const login = () => {
    const user = userList.loginUser(username, contraseña);
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setContraseña(e.target.value)}
        />
        <Link
          className="block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer w-75 text-center"
          onClick={login}
        >
          Ingresar
        </Link>
      </Form>
    </section>
  );
};
