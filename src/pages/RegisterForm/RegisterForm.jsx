import "./RegisterForm.css";
import { Form } from "../../components/Form/Form";
import { useRef, useState } from "react";
import { User } from "../../classes/User";
import { UsersList } from "../../classes/UsersList";
import {
  failureMessage,
  succesMessage,
} from "../../utils/toastMessagesFunctions";

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

  const [isShowPassword, setIsShowPassword] = useState(false);

  const addUser = (e) => {
    e.preventDefault();

    const emptyField = references.some((ref) => ref.current.value === "");

    if (emptyField) {
      failureMessage("Todos los campos deben estar completos");
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
      failureMessage("La contraseña debe tener como minimo 6 caracteres");
      contraseñaRef.current.style.border = "1px solid red";

      setTimeout(() => {
        contraseñaRef.current.style.border = "1px solid black";
      }, 2000);
      return;
    }

    if (contraseñaRef.current.value !== confirmarContraseñaRef.current.value) {
      failureMessage("Las contraseñas ingresadas no son iguales");
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
    setTimeout(() => {
      succesMessage("Usuario creado con exito");
    }, 100);
  };

  return (
    <section className="flex justify-center">
      <Form title={"Registrarse"}>
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="input border border-black h-11 px-6 radius w-75"
          ref={nombreRef}
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="input border border-black h-11 px-6 radius w-75"
          ref={apellidoRef}
        />
        <input
          type="text"
          placeholder="Ingresar nombre de usuario"
          className="input border border-black h-11 px-6 radius w-75"
          ref={usernameRef}
        />
        <input
          type="text"
          placeholder="Ingresar email"
          className="input border border-black h-11 px-6 radius w-75"
          ref={emailRef}
        />
        <div className="flex items-center">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Ingresar contraseña"
            className="input border border-black h-11 px-6 radius password w-75"
            ref={contraseñaRef}
          />
          <button
            className="border border-black h-11 px-3 radius btn-password text-lg"
            onClick={(e) => {
              setIsShowPassword(!isShowPassword);
              e.preventDefault();
            }}
          >
            <ion-icon
              name={!isShowPassword ? "eye-off-outline" : "eye-outline"}
            ></ion-icon>
          </button>
        </div>

        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Confirmar contraseña"
          className="input border border-black h-11 px-6 radius w-75"
          ref={confirmarContraseñaRef}
        />
        <button
          className="btn-auth block radius px-3 py-2 text-base font-medium bg-black text-white cursor-pointer w-75"
          onClick={addUser}
        >
          Ingresar
        </button>
      </Form>
    </section>
  );
};
