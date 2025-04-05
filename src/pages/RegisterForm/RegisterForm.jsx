import "./RegisterForm.css";
import { Form } from "../../components/Form/Form";
import { useRef, useState } from "react";
import { User } from "../../classes/User";
import { UsersList } from "../../classes/UsersList";

export const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const contraseñaRef = useRef(null);
  const references = [
    nombreRef,
    apellidoRef,
    usernameRef,
    emailRef,
    contraseñaRef,
  ];
  const userList = new UsersList();

  userList.viewAllUsers();

  const addUser = (e) => {
    e.preventDefault();

    if (
      nombre === "" ||
      apellido === "" ||
      username === "" ||
      email === "" ||
      contraseña === ""
    ) {
      alert("Todos los campos deben estar completos");
      references.forEach((ref) => {
        ref.current.style.border = "1px solid red";
      });

      const timeout = setTimeout(() => {
        references.forEach((ref) => {
          ref.current.style.border = "1px solid black";
        });

        clearTimeout(timeout);
      }, 2000);

      return;
    }

    if (contraseña.length <= 5) {
      alert("La contraseña debe tener como minimo 6 caracteres");
      contraseñaRef.current.style.border = "1px solid red";

      const timeout = setTimeout(() => {
        contraseñaRef.current.style.border = "1px solid black";
        clearTimeout(timeout);
      }, 2000);
      return;
    }

    const user = new User(nombre, apellido, username, email, contraseña);
    userList.registerUser(user);
    document.location = "/login";
    console.log(user);
  };

  return (
    <section className="flex items-center justify-center">
      <Form title={"Registrarse"}>
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setNombre(e.target.value)}
          ref={nombreRef}
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setApellido(e.target.value)}
          ref={apellidoRef}
        />
        <input
          type="text"
          placeholder="Ingresar nombre de usuario"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
        />
        <input
          type="text"
          placeholder="Ingresar email"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
        <input
          type="text"
          placeholder="Ingresar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          onChange={(e) => setContraseña(e.target.value)}
          ref={contraseñaRef}
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
