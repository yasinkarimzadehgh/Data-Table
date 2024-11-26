import "./App.css";
import MainNav from "./components/MainNav";
import { ThemeProvider } from "@/components/theme-provider";
import Table from "./components/Table";
import { useState } from "react";

// Define the type for a city
type City = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
};

const dataTable: City[] = [
  {
    title: "Mr",
    firstName: "Riza",
    lastName: "Schneiders",
    email: "riza.schneiders@example.com",
    city: "Ostallgäu",
    hemisphere: "North",
  },
  {
    title: "Ms",
    firstName: "Gloria",
    lastName: "Lambert",
    email: "gloria.lambert@example.com",
    city: "Coral Springs",
    hemisphere: "North",
  },
  {
    title: "Miss",
    firstName: "Coline",
    lastName: "Meyer",
    email: "coline.meyer@example.com",
    city: "Montpellier",
    hemisphere: "North",
  },
  {
    title: "Mr",
    firstName: "David",
    lastName: "Grewal",
    email: "david.grewal@example.com",
    city: "Chesterville",
    hemisphere: "North",
  },
  {
    title: "Mr",
    firstName: "Francis",
    lastName: "Stephens",
    email: "francis.stephens@example.com",
    city: "Bendigo",
    hemisphere: "South",
  },
  {
    title: "Mr",
    firstName: "Gordon",
    lastName: "Roberts",
    email: "gordon.roberts@example.com",
    city: "Geraldton",
    hemisphere: "South",
  },
  {
    title: "Mr",
    firstName: "Zeki",
    lastName: "Hetzel",
    email: "zeki.hetzel@example.com",
    city: "Rheinbach",
    hemisphere: "North",
  },
  {
    title: "Mr",
    firstName: "Angel",
    lastName: "Duran",
    email: "angel.duran@example.com",
    city: "Pozuelo de Alarcón",
    hemisphere: "North",
  },
  {
    title: "Mr",
    firstName: "Bryan",
    lastName: "Hudson",
    email: "bryan.hudson@example.com",
    city: "Plymouth",
    hemisphere: "North",
  },
];

function App(): JSX.Element {
  const [rows, setRows] = useState<City[]>(dataTable);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <nav className="flex flex-col items-center border-b mb-5 py-3">
        <div className="max-w-6xl w-full">
          <MainNav />
        </div>
      </nav>
      <main className="flex flex-col items-center">
        <div className="max-w-6xl w-full mb-10">
          <Table data={rows} />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
