export class UsersList {
  usersListInLocalStorage() {
    const data = localStorage.getItem("usersList");
    return data ? JSON.parse(data) : [];
  }
  constructor() {
    this.usersList = this.usersListInLocalStorage();
  }

  registerUser(user) {
    this.usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(this.usersList));
    alert("usuario registrado");
  }

  loginUser(username, password) {
    const findUser = this.usersList.find((u) => u.username === username);

    if (!findUser) {
      alert("Usuario no encontrado");
      return null;
    }

    if (findUser.contraseña !== password) {
      alert("Credenciales incorrectas");
      return null;
    }

    return findUser;
  }

  viewAllUsers() {
    console.log(this.usersList);
  }
}
