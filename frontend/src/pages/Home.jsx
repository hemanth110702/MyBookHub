import RecentlyAdded from "../components/home/RecentlyAdded";
import TopBooks from "../components/home/TopBooks";
import TopAuthors from "../components/home/TopAuthors";

const Home = () => {
  return (
    <>
      <p>This is Home Page.</p>
      <TopBooks /> {/* based on starred */}
      <TopAuthors /> {/* based on followers */}
      <RecentlyAdded /> {/* recent added books */}
    </>
  );
};

export default Home;
