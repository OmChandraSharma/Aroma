import Header from "../components/Header/Header.jsx";
import FilterPanel from "../components/FilterPanel/FilterPanel.jsx";
import FloatingSellButton from "../components/FloatingSellButton/FloatingSellButton.jsx";

const Home = () => {
  console.log("home rendered");
  return (
    <div>
      <Header />
      <FilterPanel />
      <FloatingSellButton />
    </div>
  );
};

export default Home;
