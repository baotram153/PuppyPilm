import { useState } from "react";
import { Checkbox, Table, Button} from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { TbSortAscending,  TbSortDescending, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import EditForm from "./EditForm";

export default function RatingTable() {
    const [data, setData] = useState(
        [
            {
                id: 1,
                title: "Breaking Bad - Season 1",
                NoN: 4, // Number of Nomination
                NoA: 2, // Number of Award
                rate: 50
            },
            {
                id: 2,
                title: "Schindler's List",
                NoN: 6,
                NoA: 2, 
                rate: 33.3
            },
            {
                id: 3,
                title: "Singin' in the Rain",
                NoN: 12,
                NoA: 3, 
                rate: 25
            },
            {
                id: 4,
                title: "Breaking Bad - Season 2",
                NoN: 10,
                NoA: 2, 
                rate: 20
            }
        ]
    )
    const [searchTitle, setSearchTitle] = useState('');
    const [searchNoN, setSearchNoN] = useState('');
    const [searchNoA, setSearchNoA] = useState('');
    const [searchRate, setSearchRate] = useState('');
    const [filteredData, setfilteredData] = useState(data);
    const [sortConfig, setSortConfig] = useState(
        [
            { key: "id", isAscending: true },
            { key: "title", isAscending: true },
            { key: "NoN", isAscending: true },
            { key: "NoA", isAscending: true },
            { key: "rate", isAscending: true }
        ]
    );

    const handleSearch= () => {
        const filteredResult = data.filter((row) => {
            const checkTitle = row.title.toLowerCase()
            .includes(searchTitle.toLowerCase()) || searchTitle === '';
            
            const checkNoN = row.NoN > Number(searchNoN) || searchNoN === '';

            const checkNoA = row.NoA > Number(searchNoA) || searchNoA === '';

            const checkRate = row.rate > Number(searchRate) || searchRate === '';
            
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
                        onClick={() => handleSort("id")}>
                            Movie ID 
                            {getSortIndicator("id")}
                        </Table.HeadCell>
                        <Table.HeadCell
                        onClick={() => handleSort("title")}>
                            Title
                            {getSortIndicator("title")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("NoN")}>
                            Number of nominations
                            {getSortIndicator("NoN")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("NoA")}>
                            Number of awards
                            {getSortIndicator("NoA")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("rate")}>
                            Winning Ratio (%)
                            {getSortIndicator("rate")}
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {filteredData.map((row) => (
                            <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {row.id}
                                </Table.Cell>
                                <Table.Cell>{row.title}</Table.Cell>
                                <Table.Cell>{row.NoN}</Table.Cell>
                                <Table.Cell>{row.NoA}</Table.Cell>
                                <Table.Cell>{row.rate}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};