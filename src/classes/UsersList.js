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
      return null; // Evita errores y permite manejar el caso donde el usuario no existe
    }

    if (findUser.contraseña !== password) {
      alert("Credenciales incorrectas");
      return null; // Indica que la autenticación falló
    }

    return findUser; // Devuelve el usuario si las credenciales son correctas
  }

  viewAllUsers() {
    console.log(this.usersList);
  }
}
