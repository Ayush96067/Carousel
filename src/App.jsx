import Filter from "./components/FigmaComponents/Filter";
import MainDisplay from "./components/FigmaComponents/MainDisplay";
import Navbar from "./components/FigmaComponents/Navbar";
import SelectionBar from "./components/FigmaComponents/SelectionBar";

const card = [
  `
  Solitaire
Three Stone
Accents
Halo
Nature Inspired
Yellow Gold
White Gold
Bridal Sets
Round`,
];

function App() {
  return (
    <div className="px-10 py-5">
      <Navbar />
      <SelectionBar />
      <Filter />
      <MainDisplay />
    </div>
  );
}

export default App;
