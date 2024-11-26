import { useState, useEffect } from "react";
import { Checkbox, Table, Button} from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { TbSortAscending,  TbSortDescending, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import EditForm from "./EditForm";

export default function RatingTable() {
    const [data, setData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://puppypilm.tatrungtin.id.vn/api/movies/awards`) // Replace with your API URL
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((jsonData) => {
            if (jsonData.success && Array.isArray(jsonData.data )) {
                console.log("Fetched Data:", jsonData);
                setData(jsonData.data); // Update data if the response is successful
                setfilteredData(jsonData.data);
                setLoading(false);
              } else {
                throw new Error(jsonData.message || "API Error");
              }
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);

    /* if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>; */
    console.log("fetched data: ", data);

    const [searchTitle, setSearchTitle] = useState('');
    const [searchNoN, setSearchNoN] = useState('');
    const [searchNoA, setSearchNoA] = useState('');
    const [searchRate, setSearchRate] = useState('');
    const [sortConfig, setSortConfig] = useState(
        [
            { key: "movie_id", isAscending: true },
            { key: "title", isAscending: true },
            { key: "number_of_nominations", isAscending: true },
            { key: "number_of_awards", isAscending: true },
            { key: "winning_ratio", isAscending: true }
        ]
    );

    const handleSearch= () => {
        const filteredResult = data.filter((row) => {
            const checkTitle = row.title.toLowerCase()
            .includes(searchTitle.toLowerCase()) || searchTitle === '';
            
            const checkNoN = row.number_of_nominations > Number(searchNoN) || searchNoN === '';

            const checkNoA = row.number_of_awards > Number(searchNoA) || searchNoA === '';

            const checkRate = row.winning_ratio > Number(searchRate) || searchRate === '';
            
            return checkTitle && checkNoN && checkNoA && checkRate;
        });
        setfilteredData(filteredResult);
    };
    
    const handleSort = (key) => {
        var toggledDirect = true;
        setSortConfig(
            sortConfig.map((item) => {
                    if(item.key === key) {
                        toggledDirect = !item.isAscending;
                        return {...item, isAscending: toggledDirect}
                    } else {
                        return item;
                    }
                }
            )
        );
        const sortedData = [...filteredData].sort((a, b) => {
            if(toggledDirect) {
                if(key === "title") {
                    return a[key].localeCompare(b[key]);
                } else {
                    return a[key] - b[key];
                } 
            } else {
                if(key === "title") {
                    return b[key].localeCompare(a[key]);
                } else {
                    return b[key] - a[key];
                } 
            }
        });
        

        setfilteredData(sortedData);
    };

    const getSortIndicator = (key) => {
        const item = sortConfig.find((item) => item.key === key);
        if(item.key === key) {
            if(item.isAscending) {
                if(key === "title") {
                    return <TbSortAscendingLetters />;
                } else {
                    return <TbSortAscending />;
                }
            } else {
                if(key === "title") {
                    return <TbSortDescendingLetters />;
                } else {
                    return <TbSortDescending />;
                }
            }
        }
        return null;
    };
    return (
        <div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Title
                        </label>
                        <TextInput
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Title"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Number of Nominations
                        </label>
                        <TextInput
                            type="number"
                            value={searchNoN}
                            onChange={(e) => setSearchNoN(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Number of Awards
                        </label>
                        <TextInput
                            type="number"
                            value={searchNoA}
                            onChange={(e) => setSearchNoA(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Winning Rate (%)
                        </label>
                        <TextInput
                            type="number"
                            value={searchRate}
                            onChange={(e) => setSearchRate(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div className="flex justify-start">
                        <Button onClick={handleSearch}>Filter</Button>
                    </div>
                </div>
            </form>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell 
                        onClick={() => handleSort("movie_id")}>
                            Movie ID 
                            {getSortIndicator("movie_id")}
                        </Table.HeadCell>
                        <Table.HeadCell
                        onClick={() => handleSort("title")}>
                            Title
                            {getSortIndicator("title")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("number_of_nominations")}>
                            Number of nominations
                            {getSortIndicator("number_of_nominations")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("number_of_awards")}>
                            Number of awards
                            {getSortIndicator("number_of_awards")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("winning_ratio")}>
                            Winning Ratio (%)
                            {getSortIndicator("winning_ratio")}
                        </Table.HeadCell>
                    </Table.Head>
                    <div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                    </div>
                    <Table.Body className="divide-y">
                        {filteredData.map((row) => (
                            <Table.Row key={row.movie_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {row.movie_id}
                                </Table.Cell>
                                <Table.Cell>{row.title}</Table.Cell>
                                <Table.Cell>{row.number_of_nominations}</Table.Cell>
                                <Table.Cell>{row.number_of_awards}</Table.Cell>
                                <Table.Cell>{row.winning_ratio}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};