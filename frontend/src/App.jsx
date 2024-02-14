import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateBook from "../pages/CreateBook";
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";
import ShowBook from "../pages/ShowBook";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books">
          <Route path="create" element={<CreateBook />} />
          <Route path="details/:id" element={<ShowBook />} />
          <Route path="edit/:id" element={<EditBook />} />
          <Route path="delete/:id" element={<DeleteBook />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
