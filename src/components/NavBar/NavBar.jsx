import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./NavBar.css";
import { Link } from "wouter";
import { useRef, useState } from "react";

export const NavBar = ({ type, setType, searchMovie, setSearchMovie }) => {
  const textInputSearch = useRef(null);

  const currentUserInLocalStorage = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : {};
  };

  const logOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    localStorage.setItem("logoutMessage", "Sesion cerrada con exito");
    document.location = "/login";
  };

  const [user, setUser] = useState(currentUserInLocalStorage());

  const inputSearchPlaceHolder =
    type === "movie" ? "Ingresa una pelicula..." : "Ingresa una serie...";

  const handleType = (type) => {
    setType(type);
    setSearchMovie("");
  };

  const handleSearchMovie = (name) => {
    setSearchMovie(name);
    setTimeout(() => {
      textInputSearch.current.value = "";
    }, 8000);
  };

  return (
    <nav className="fixed w-full z-30">
      <Disclosure as="nav" className="nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <p className="font-medium text-2xl mb-1 title-computer-nav">
                  CINEMANIA
                </p>
                <p className="font-medium text-2xl title-mobile-nav">CNM</p>
              </div>
              <div className="hidden md:block">
                <ul className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="block rounded-md px-3 py-2 text-base font-medium underline-after"
                  >
                    Inicio
                  </Link>
                  <Link
                    className="block rounded-md px-3 py-2 text-base font-medium underline-after"
                    onClick={() => handleType("movie")}
                    to="/list"
                  >
                    Peliculas
                  </Link>
                  <Link
                    to="/list"
                    className="block rounded-md px-3 py-2 text-base font-medium underline-after"
                    onClick={() => handleType("serie")}
                  >
                    Series
                  </Link>
                </ul>
              </div>
              <input
                placeholder={inputSearchPlaceHolder}
                type="search"
                className="flex border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black w-80 pl-3 py-2 rounded-md transition-colors duration-300 max-sm:w-46 max-sm:ml-2"
                onChange={(e) => handleSearchMovie(e.target.value)}
                ref={textInputSearch}
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="relative ml-3">
                  {user && user.username ? (
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-md border border-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <h2 className="text-black p-2">{user.username}</h2>
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <MenuItem>
                          <Link
                            to={"/favorites"}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                          >
                            Favoritos
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                            onClick={logOut}
                          >
                            Cerrar Sesion
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <Link
                        to="/login"
                        className="block rounded-md px-3 py-2 text-base font-medium border-2 border-black hover:bg-black hover:text-white transition-all duration-150 cursor-pointer"
                      >
                        Iniciar Sesion
                      </Link>
                      <Link
                        to="/register"
                        className="block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer"
                      >
                        Registrarse
                      </Link>
                    </div>
                  )}
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-open:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <ul className=" space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link
              to="/"
              className="text-black block rounded-md px-3 py-2 text-base font-medium"
            >
              Inicio
            </Link>
            <Link
              className="block rounded-md px-3 py-2 text-base font-medium underline-after"
              onClick={() => setType("movie")}
              to="/list"
            >
              Peliculas
            </Link>
            <Link
              to="/list"
              className="block rounded-md px-3 py-2 text-base font-medium underline-after"
              onClick={() => setType("serie")}
            >
              Series
            </Link>
          </ul>
          <div className="pt-4 pb-3">
            {user && user.username ? (
              <div className="mt-3 space-y-1 px-2">
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  to={"/favorites"}
                >
                  Favoritos
                </Link>
                <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                  {user.username}
                </DisclosureButton>
                <DisclosureButton
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={logOut}
                >
                  Cerrar Sesion
                </DisclosureButton>
              </div>
            ) : (
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex gap-4 justify-center">
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium border-2 border-black hover:bg-black hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    Iniciar Sesion
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium bg-black text-white cursor-pointer"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </nav>
  );
};
