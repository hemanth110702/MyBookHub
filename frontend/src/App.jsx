import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import BookDisplay from "./pages/BookDisplay";
import CreateBook from "./pages/CreateBook";
import Explore from "./pages/Explore";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Nav />
      <SearchBox />
      {/* <CreateBook /> */}
      {/* <Home /> */}
      <BookDisplay />
    </>
  );
}

export default App;
