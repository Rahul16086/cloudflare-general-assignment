import "./App.css";
import AllPosts from "./components/AllPosts/AllPosts";
import NavBar from "./components/NavBar/NavBar";
import NewPost from "./components/NewPost/NewPost";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={"/"} exact>
          <AllPosts />
        </Route>
        <Route path={"/new"}>
          <NewPost />
        </Route>
      </Switch>
    </>
  );
}

export default App;
