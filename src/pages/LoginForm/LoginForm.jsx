import { useEffect, useRef, useState } from "react";
import { Form } from "../../components/Form/Form";
import "./LoginForm.css";
import { UsersList } from "../../classes/UsersList";
import {
  failureMessage,
  succesMessage,
} from "../../utils/toastMessagesFunctions";

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
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
      localStorage.setItem("loginMessage", `Bienvenido ${user.username}`);
      document.location = "/";
    }
  };

  useEffect(() => {
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      setTimeout(() => {
        succesMessage(message);
      }, 50);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  return (
    <section className="flex items-center justify-center">
      <Form title={"Iniciar Sesion"}>
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="input border border-black p-2 px-6 rounded-md w-75"
          ref={usernameRef}
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
        <button
          className="btn-auth block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer w-75 text-center"
          onClick={login}
        >
          Ingresar
        </button>
      </Form>
    </section>
  );
};
