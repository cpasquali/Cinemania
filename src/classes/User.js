export class User {
  constructor(nombre, apellido, username, email, contraseña) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.username = username),
      (this.email = email),
      (this.contraseña = contraseña);
  }
}

/* localStorage.removeItem("currentUser");
 */
