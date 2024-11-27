import "./App.css";
import MainNav from "./components/MainNav";
import Table from "./components/Table";
import { useState } from "react";
import { dataTable } from "./data/data";

type City = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
};

function App(): JSX.Element {
  const [rows, setRows] = useState<City[]>(dataTable);
  return (
    <>
      <nav className="flex flex-col items-center border-b mb-5 py-3">
        <div className="max-w-6xl w-full">
          <MainNav />
        </div>
      </nav>
      <main className="flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <Table data={rows} />
        </div>
      </main>
    </>
  );
}

export default App;
