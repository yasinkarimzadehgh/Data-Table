import MainNav from "./components/MainNav";
import Table from "./components/Table";
import { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredRows = dataTable.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRows(filteredRows);
  }, [searchQuery]);

  return (
    <>
      <nav className="flex flex-col items-center border-b mb-5 py-2">
        <div className="max-w-6xl w-full flex justify-between items-center">
          <MainNav />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border py-1 px-3 rounded"
          />
        </div>
      </nav>
      <main className="flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <Table data={rows} searchQuery={searchQuery} />{" "}
        </div>
      </main>
    </>
  );
}

export default App;
