import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { ContentContainer } from "./pages/ContentContainer/ContentContainer";
import { NavBar } from "./components/NavBar/NavBar";
import { Switch, Route } from "wouter";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginForm } from "./pages/LoginForm/LoginForm";
import { RegisterForm } from "./pages/RegisterForm/RegisterForm";
import { FavoritesMoviesContainer } from "./pages/FavoritesMoviesContainer/FavoritesMoviesContainer";

function App() {
  const [type, setType] = useState("movie");
  return (
    <>
      <NavBar setType={setType} />
      <main>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route
            path="/list"
            component={() => <ContentContainer type={type} />}
          />
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/register"} component={RegisterForm} />
          <Route path={"/favorites"} component={FavoritesMoviesContainer} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
