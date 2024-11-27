import React, { useState, useRef, useEffect } from "react";
import TableRow from "./TableRow";

type TableRowData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  hemisphere: string;
};

interface TableProps {
  data: TableRowData[];
}

function Table({ data }: TableProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // States for filters and sorting
  const [isDropdownOpenTitle, setIsDropdownOpenTitle] = useState(false);
  const [isDropdownOpenFirstName, setIsDropdownOpenFirstName] = useState(false);
  const [isDropdownOpenLastName, setIsDropdownOpenLastName] = useState(false);
  const [isDropdownOpenHemisphere, setIsDropdownOpenHemisphere] =
    useState(false);
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [filterHemisphere, setFilterHemisphere] = useState<string>("");

  const [sortFirstName, setSortFirstName] = useState<"asc" | "desc" | null>(
    null
  );
  const [sortLastName, setSortLastName] = useState<"asc" | "desc" | null>(null);

  // States for Deleting
  const [tableData, setTableData] = useState<TableRowData[]>(data);

  const filteredData = tableData
    .filter((row) =>
      filterTitle ? row.title.toLowerCase() === filterTitle.toLowerCase() : true
    )
    .filter((row) =>
      filterHemisphere
        ? row.hemisphere.toLowerCase() === filterHemisphere.toLowerCase()
        : true
    );

  const sortedByFirstName =
    sortFirstName !== null
      ? [...filteredData].sort((a, b) => {
          const firstNameA = a.firstName.toLowerCase();
          const firstNameB = b.firstName.toLowerCase();
          return sortFirstName === "asc"
            ? firstNameA.localeCompare(firstNameB)
            : firstNameB.localeCompare(firstNameA);
        })
      : filteredData;

  const sortedData =
    sortLastName !== null
      ? [...sortedByFirstName].sort((a, b) => {
          const lastNameA = a.lastName.toLowerCase();
          const lastNameB = b.lastName.toLowerCase();
          return sortLastName === "asc"
            ? lastNameA.localeCompare(lastNameB)
            : lastNameB.localeCompare(lastNameA);
        })
      : sortedByFirstName;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  // Handle sorting for Title
  const handleSortTitle = (title: string | null) => {
    setFilterTitle(title || "");
    setCurrentPage(1); // Reset to page 1 when a filter is applied
    setIsDropdownOpenTitle(false);
  };

  // Handle sorting for First Name
  const handleSortFirstName = (direction: "asc" | "desc" | null) => {
    setSortFirstName(direction);
    setCurrentPage(1); // Reset to page 1 when a filter is applied
    setIsDropdownOpenFirstName(false);
  };

  // Handle sorting for Last Name
  const handleSortLastName = (direction: "asc" | "desc" | null) => {
    setSortLastName(direction);
    setCurrentPage(1); // Reset to page 1 when a filter is applied
    setIsDropdownOpenLastName(false);
  };

  // Handle sorting for Hemisphere
  const handleSortHemisphere = (hemisphere: string | null) => {
    setFilterHemisphere(hemisphere || "");
    setCurrentPage(1); // Reset to page 1 when a filter is applied
    setIsDropdownOpenHemisphere(false);
  };

  // Close dropdown when clicking outside
  const titleDropdownRef = useRef<HTMLDivElement>(null);
  const firstNameDropdownRef = useRef<HTMLDivElement>(null);
  const lastNameDropdownRef = useRef<HTMLDivElement>(null);
  const hemisphereDropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      titleDropdownRef.current &&
      !titleDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpenTitle(false);
    }
    if (
      firstNameDropdownRef.current &&
      !firstNameDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpenFirstName(false);
    }
    if (
      lastNameDropdownRef.current &&
      !lastNameDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpenLastName(false);
    }
    if (
      hemisphereDropdownRef.current &&
      !hemisphereDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpenHemisphere(false);
    }
  };

  const handleDeleteRow = (index: number) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-5" style={{ minHeight: "400px", maxHeight: "400px" }}>
        <table
          className="w-full border-collapse border text-left text-sm"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th className="p-2 border" style={{ width: "12%" }}>
                Title
                <div className="relative inline-block">
                  <button
                    className="ml-2 border px-2 py-1 text-sm"
                    onClick={() => setIsDropdownOpenTitle(!isDropdownOpenTitle)}
                  >
                    {filterTitle ? filterTitle : "Filter ▼"}
                  </button>
                  {isDropdownOpenTitle && (
                    <div
                      ref={titleDropdownRef}
                      className="absolute mt-1 bg-white border shadow-md z-10"
                    >
                      <ul>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortTitle("Mr")}
                        >
                          Mr
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortTitle("Miss")}
                        >
                          Miss
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortTitle("")}
                        >
                          Clear
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </th>
              <th className="p-2 border" style={{ width: "15%" }}>
                First Name
                <div className="relative inline-block">
                  <button
                    className="ml-2 border px-2 py-1 text-sm"
                    onClick={() =>
                      setIsDropdownOpenFirstName(!isDropdownOpenFirstName)
                    }
                  >
                    {sortFirstName === null
                      ? "Filter ▼"
                      : sortFirstName === "asc"
                      ? "A to Z"
                      : "Z to A"}
                  </button>
                  {isDropdownOpenFirstName && (
                    <div
                      ref={firstNameDropdownRef}
                      className="absolute mt-1 bg-white border shadow-md z-10"
                    >
                      <ul>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortFirstName("asc")}
                        >
                          A to Z
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortFirstName("desc")}
                        >
                          Z to A
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortFirstName(null)}
                        >
                          Clear
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </th>
              <th className="p-2 border" style={{ width: "15%" }}>
                Last Name
                <div className="relative inline-block">
                  <button
                    className="ml-2 border px-2 py-1 text-sm"
                    onClick={() =>
                      setIsDropdownOpenLastName(!isDropdownOpenLastName)
                    }
                  >
                    {sortLastName === null
                      ? "Filter ▼"
                      : sortLastName === "asc"
                      ? "A to Z"
                      : "Z to A"}
                  </button>
                  {isDropdownOpenLastName && (
                    <div
                      ref={lastNameDropdownRef}
                      className="absolute mt-1 bg-white border shadow-md z-10"
                    >
                      <ul>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortLastName("asc")}
                        >
                          A to Z
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortLastName("desc")}
                        >
                          Z to A
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortLastName(null)}
                        >
                          Clear
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </th>

              <th className="p-2 border" style={{ width: "20%" }}>
                Email
              </th>
              <th className="p-2 border" style={{ width: "10%" }}>
                City
              </th>
              <th className="p-2 border" style={{ width: "15%" }}>
                Hemisphere
                <div className="relative inline-block">
                  <button
                    className="ml-2 border px-2 py-1 text-sm"
                    onClick={() =>
                      setIsDropdownOpenHemisphere(!isDropdownOpenHemisphere)
                    }
                  >
                    {filterHemisphere ? filterHemisphere : "Filter ▼"}
                  </button>
                  {isDropdownOpenHemisphere && (
                    <div
                      ref={hemisphereDropdownRef}
                      className="absolute mt-1 bg-white border shadow-md z-10"
                    >
                      <ul>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortHemisphere("North")}
                        >
                          North
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortHemisphere("South")}
                        >
                          South
                        </li>
                        <li
                          className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSortHemisphere("")}
                        >
                          Clear
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <TableRow
                key={index}
                title={row.title}
                firstName={row.firstName}
                lastName={row.lastName}
                email={row.email}
                city={row.city}
                hemisphere={row.hemisphere}
                onDelete={() => handleDeleteRow(index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-2 py-1 border rounded ${
              currentPage === i + 1 ? "bg-gray-200" : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 border rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Table;
