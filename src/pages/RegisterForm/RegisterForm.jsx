import "./RegisterForm.css";
import { Form } from "../../components/Form/Form";
import { useState } from "react";
import { User } from "../../classes/User";
import { UsersList } from "../../classes/UsersList";

export const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const userList = new UsersList();

  userList.viewAllUsers();

  const addUser = (e) => {
    e.preventDefault();
    const user = new User(nombre, apellido, username, email, contraseña);
    userList.registerUser(user);
    document.location = "/login";
  };

  return (
    <section className="flex items-center justify-center">
      <Form title={"Registrarse"}>
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresar nombre de usuario"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresar email"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button
          className="block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer w-75"
          onClick={addUser}
        >
          Ingresar
        </button>
      </Form>
    </section>
  );
};
