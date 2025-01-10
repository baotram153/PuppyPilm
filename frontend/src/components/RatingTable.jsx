import { useState, useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { TbSortAscending, TbSortDescending, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";

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
                if (jsonData.success && Array.isArray(jsonData.data)) {
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

    const handleSearch = () => {
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
                if (item.key === key) {
                    toggledDirect = !item.isAscending;
                    return { ...item, isAscending: toggledDirect }
                } else {
                    return item;
                }
            }
            )
        );
        const sortedData = [...filteredData].sort((a, b) => {
            if (toggledDirect) {
                if (key === "title") {
                    return a[key].localeCompare(b[key]);
                } else {
                    return a[key] - b[key];
                }
            } else {
                if (key === "title") {
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
        if (item.key === key) {
            if (item.isAscending) {
                if (key === "title") {
                    return <TbSortAscendingLetters />;
                } else {
                    return <TbSortAscending />;
                }
            } else {
                if (key === "title") {
                    return <TbSortDescendingLetters />;
                } else {
                    return <TbSortDescending />;
                }
            }
        }
        return null;
    };
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Filter by Rating</h2>
                <div className="grid gap-6 mb-6 md:grid-cols-2 text-left">
                    <div>
                        <label className="text-sm text-gray-400">
                            Title
                        </label>
                        <Input
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Search by Title"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">
                            Number of Nominations
                        </label>
                        <Input
                            type="number"
                            value={searchNoN}
                            onChange={(e) => setSearchNoN(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">
                            Number of Awards
                        </label>
                        <Input
                            type="number"
                            value={searchNoA}
                            onChange={(e) => setSearchNoA(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">
                            Winning Rate (%)
                        </label>
                        <Input
                            type="number"
                            value={searchRate}
                            onChange={(e) => setSearchRate(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div className="flex justify-start">
                        <Button onClick={handleSearch} className="mt-6 bg-red-600 hover:bg-red-700 text-white hover:scale-105">Filter</Button>
                    </div>
                </div>
            <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                <Table hoverable>
                    <TableHeader>
                        <TableRow className="border-zinc-700 bg-zinc-800">
                            <TableHead className="text-gray-400"
                                onClick={() => handleSort("movie_id")}>
                                Movie ID
                                {getSortIndicator("movie_id")}
                            </TableHead>
                            <TableHead className="text-gray-400"
                                onClick={() => handleSort("title")}>
                                Title
                                {getSortIndicator("title")}
                            </TableHead>
                            <TableHead className="text-gray-400"
                                onClick={() => handleSort("number_of_nominations")}>
                                Number of nominations
                                {getSortIndicator("number_of_nominations")}
                            </TableHead>
                            <TableHead className="text-gray-400"
                                onClick={() => handleSort("number_of_awards")}>
                                Number of awards
                                {getSortIndicator("number_of_awards")}
                            </TableHead>
                            <TableHead className="text-gray-400"
                                onClick={() => handleSort("winning_ratio")}>
                                Winning Ratio (%)
                                {getSortIndicator("winning_ratio")}
                            </TableHead>
                        </TableRow>

                    </TableHeader>
                    <div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                    </div>
                    <TableBody className="divide-y">
                        {filteredData.map((row) => (
                            <TableRow key={row.movie_id} className="border-zinc-700">
                                <TableCell className="text-white py-4">
                                    {row.movie_id}
                                </TableCell>
                                <TableCell className="text-white py-4">{row.title}</TableCell>
                                <TableCell className="text-white py-4">{row.number_of_nominations}</TableCell>
                                <TableCell className="text-white py-4">{row.number_of_awards}</TableCell>
                                <TableCell className="text-white py-4">{row.winning_ratio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};