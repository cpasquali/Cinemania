import "./RegisterForm.css";
import { Form } from "../../components/Form/Form";
import { useRef } from "react";
import { User } from "../../classes/User";
import { UsersList } from "../../classes/UsersList";

export const RegisterForm = () => {
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const contraseñaRef = useRef(null);
  const confirmarContraseñaRef = useRef(null);
  const references = [
    nombreRef,
    apellidoRef,
    usernameRef,
    emailRef,
    contraseñaRef,
    confirmarContraseñaRef,
  ];
  const userList = new UsersList();

  if (nombreRef.current) {
    console.log("valor del ref:", nombreRef.current.value);
  }

  const addUser = (e) => {
    e.preventDefault();

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

    if (contraseñaRef.current.value.length <= 5) {
      alert("La contraseña debe tener como minimo 6 caracteres");
      contraseñaRef.current.style.border = "1px solid red";

      setTimeout(() => {
        contraseñaRef.current.style.border = "1px solid black";
      }, 2000);
      return;
    }

    if (contraseñaRef.current.value !== confirmarContraseñaRef.current.value) {
      alert("Las contraseñas ingresadas no son iguales");
      contraseñaRef.current.style.border = "1px solid red";
      confirmarContraseñaRef.current.style.border = "1px solid red";

      setTimeout(() => {
        contraseñaRef.current.style.border = "1px solid black";
        confirmarContraseñaRef.current.style.border = "1px solid red";
      }, 2000);
      return;
    }

    const user = new User(
      nombreRef.current.value,
      apellidoRef.current.value,
      usernameRef.current.value,
      emailRef.current.value,
      contraseñaRef.current.value
    );
    const responseOk = userList.registerUser(user);
    if (!responseOk) {
      return;
    }
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
          ref={nombreRef}
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={apellidoRef}
        />
        <input
          type="text"
          placeholder="Ingresar nombre de usuario"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={usernameRef}
        />
        <input
          type="text"
          placeholder="Ingresar email"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={emailRef}
        />
        <input
          type="text"
          placeholder="Ingresar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={contraseñaRef}
        />
        <input
          type="text"
          placeholder="Confirmar contraseña"
          className="border border-black p-2 px-6 rounded-md w-75"
          ref={confirmarContraseñaRef}
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
