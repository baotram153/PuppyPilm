import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input";
import { TbSortAscending, TbSortDescending, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import EditForm from "./EditForm";

import axiosAuthInstance from "../api/axiosAuthInstance";
import { cn } from "../lib/utils";

export default function RankingTable({ className }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosAuthInstance.get(`/users/rankings`) // Replace with your API URL
            .then((response) => {
                console.log("Response:", response);
                setData(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    /* if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>; */
    console.log("fetched data: ", data);

    const [searchName, setSearchName] = useState('');
    const [searchReview, setSearchReview] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [searchLike, setSearchLike] = useState('');
    const [searchPoint, setSearchPoint] = useState('');
    const [searchRanking, setSearchRanking] = useState('');
    const [sortConfig, setSortConfig] = useState(
        [
            { key: "user_id", isAscending: true },
            { key: "displayed_name", isAscending: true },
            { key: "total_reviews", isAscending: true },
            { key: "total_ratings", isAscending: true },
            { key: "total_likes", isAscending: true },
            { key: "points", isAscending: true },
            { key: "member_ranking", isAscending: true }
        ]
    );

    const handleSearch = () => {
        const filteredResult = data.filter((row) => {
            const checkName = row.displayed_name.toLowerCase()
                .includes(searchName.toLowerCase()) || searchName === '';

            const checkReviews = row.total_reviews > Number(searchReview) || searchReview === '';

            const checkRatings = row.total_ratings > Number(searchRating) || searchRating === '';

            const checkLikes = row.total_likes > Number(searchLike) || searchLike === '';

            const checkPoint = row.points > Number(searchPoint) || searchPoint === '';

            const checkRanking = row.member_ranking.toLowerCase()
                .includes(searchRanking.toLowerCase()) || searchRanking === '';

            console.log("Row Check:", {
                row,
                checkName,
                checkReviews,
                checkRatings,
                checkLikes,
                checkPoint,
                checkRanking
            });

            return checkName && checkReviews && checkRatings && checkLikes && checkPoint && checkRanking;
        });
        setFilteredData(filteredResult);
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
                if (key === "displayed_name") {
                    return a[key].localeCompare(b[key]);
                } else {
                    return a[key] - b[key];
                }
            } else {
                if (key === "displayed_name") {
                    return b[key].localeCompare(a[key]);
                } else {
                    return b[key] - a[key];
                }
            }
        });

        setDilteredData(sortedData);
    };

    const getSortIndicator = (key) => {
        const item = sortConfig.find((item) => item.key === key);
        if (item.key === key) {
            if (item.isAscending) {
                if (key === "displayed_name") {
                    return <TbSortAscendingLetters />;
                } else {
                    return <TbSortAscending />;
                }
            } else {
                if (key === "displayed_name") {
                    return <TbSortDescendingLetters />;
                } else {
                    return <TbSortDescending />;
                }
            }
        }
        return null;
    };
    return (
        <div className={cn("min-h-screen bg-black text-white p-6", className)}>
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-red-700">User Management</h2>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 text-left">
                        <div>
                            <label className="text-sm text-gray-400">
                                Displayed Name
                            </label>
                            <Input
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Search by Title"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">
                                Number of Reviews
                            </label>
                            <Input
                                type="number"
                                value={searchReview}
                                onChange={(e) => setSearchReview(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Greater Than..."
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">
                                Number of Ratings
                            </label>
                            <Input
                                type="number"
                                value={searchRating}
                                onChange={(e) => setSearchRating(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Greater Than..."
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">
                                Number of Likes
                            </label>
                            <Input
                                type="number"
                                value={searchLike}
                                onChange={(e) => setSearchLike(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Greater Than..."
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">
                                Point
                            </label>
                            <Input
                                type="number"
                                value={searchPoint}
                                onChange={(e) => setSearchPoint(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Greater Than..."
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">
                                Member Ranking
                            </label>
                            <Input
                                type="text"
                                value={searchRanking}
                                onChange={(e) => setSearchRanking(e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Search by Ranking"
                            />
                        </div>
                        <div className="flex justify-start">
                            <Button onClick={handleSearch} className="mt-6 bg-red-600 hover:bg-red-700 hover:scale-110 text-white">Filter</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell
                                    onClick={() => handleSort("user_id")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    User ID {getSortIndicator("user_id")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("displayed_name")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Displayed Name {getSortIndicator("displayed_name")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("total_reviews")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Total reviews {getSortIndicator("total_reviews")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("total_ratings")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Total ratings {getSortIndicator("total_ratings")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("total_likes")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Total likes {getSortIndicator("total_likes")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("points")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Points {getSortIndicator("points")}
                                </Table.HeadCell>
                                <Table.HeadCell
                                    onClick={() => handleSort("member_ranking")}
                                    className="border-zinc-700 bg-zinc-800 text-gray-400">
                                    Member Ranking {getSortIndicator("member_ranking")}
                                </Table.HeadCell>
                            </Table.Head>
                            <div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error}</p>}
                            </div>
                            <Table.Body className="divide-y">
                                {filteredData.map((row) => (
                                    <Table.Row key={row.user_id} className="border-zinc-700 hover:bg-zinc-800">
                                        <Table.Cell className="text-white py-4">
                                            {row.user_id}
                                        </Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.displayed_name}</Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.total_reviews}</Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.total_ratings}</Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.total_likes}</Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.points}</Table.Cell>
                                        <Table.Cell className="text-white py-4">{row.member_ranking}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};