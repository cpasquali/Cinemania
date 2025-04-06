import { failureMessage, succesMessage } from "../utils/toastMessagesFunctions";

export class UsersList {
  usersListInLocalStorage() {
    const data = localStorage.getItem("usersList");
    return data ? JSON.parse(data) : [];
  }
  constructor() {
    this.usersList = this.usersListInLocalStorage();
  }

  registerUser(user) {
    const repeat = this.usersList.find((u) => u.username === user.username);
    if (repeat) {
      failureMessage("Usuario ya registrado");
      return false;
    }
    this.usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(this.usersList));
    succesMessage("Usuario registrado con exito");
    return true;
  }

  loginUser(username, password) {
    const findUser = this.usersList.find((u) => u.username === username);

    if (!findUser) {
      failureMessage("Usuario no encontrado");
      return null;
    }

    if (findUser.contraseña !== password) {
      failureMessage("Credenciales incorrectas");
      return null;
    }

    return findUser;
  }

  viewAllUsers() {
    console.log(this.usersList);
  }
}
