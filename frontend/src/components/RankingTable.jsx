import { useState, useEffect } from "react";
import { Checkbox, Table, Button} from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { TbSortAscending,  TbSortDescending, TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import EditForm from "./EditForm";

export default function RankingTable() {
    const [data, setData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://puppypilm.tatrungtin.id.vn/api/users/rankings`) // Replace with your API URL
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

    const handleSearch= () => {
        const filteredResult = data.filter((row) => {
            const checkName = row.displayed_name.toLowerCase()
            .includes(searchName.toLowerCase()) || searchName === '';
            
            const checkReviews = row.total_reviews > Number(searchReview) || searchReview === '';

            const checkRatings = row.total_ratings > Number(searchRating) || searchRating === '';

            const checkLikes = row.total_likes > Number(searchLike) || searchLike === '';

            const checkPoint = row.points > Number(searchPoint) || searchPoint === '';

            const checkRanking = row.member_ranking.toLowerCase()
            .includes(searchRanking.toLowerCase()) || searchRanking === '';
            
            return checkName && checkReviews && checkRatings && checkLikes && checkPoint && checkRanking;
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
                if(key === "displayed_name") {
                    return a[key].localeCompare(b[key]);
                } else {
                    return a[key] - b[key];
                } 
            } else {
                if(key === "displayed_name") {
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
                if(key === "displayed_name") {
                    return <TbSortAscendingLetters />;
                } else {
                    return <TbSortAscending />;
                }
            } else {
                if(key === "displayed_name") {
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
                            Displayed Name
                        </label>
                        <TextInput
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Title"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Number of Reviews
                        </label>
                        <TextInput
                            type="number"
                            value={searchReview}
                            onChange={(e) => setSearchReview(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Number of Ratings
                        </label>
                        <TextInput
                            type="number"
                            value={searchRating}
                            onChange={(e) => setSearchRating(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Number of Likes
                        </label>
                        <TextInput
                            type="number"
                            value={searchLike}
                            onChange={(e) => setSearchLike(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Point
                        </label>
                        <TextInput
                            type="number"
                            value={searchPoint}
                            onChange={(e) => setSearchPoint(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Member Ranking
                        </label>
                        <TextInput
                            type="text"
                            value={searchRanking}
                            onChange={(e) => setSearchRanking(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Ranking"
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
                        onClick={() => handleSort("user_id")}>
                            User ID
                            {getSortIndicator("user_id")}
                        </Table.HeadCell>
                        <Table.HeadCell
                        onClick={() => handleSort("displayed_name")}>
                            Displayed Name
                            {getSortIndicator("displayed_name")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("total_reviews")}>
                            Total reviews
                            {getSortIndicator("total_reviews")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("total_ratings")}>
                            Total ratings
                            {getSortIndicator("total_ratings")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("total_likes")}>
                            Total likes
                            {getSortIndicator("total_likes")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("points")}>
                            Points
                            {getSortIndicator("points")}
                        </Table.HeadCell>
                        <Table.HeadCell 
                        onClick={() => handleSort("member_ranking")}>
                            Member Ranking
                            {getSortIndicator("member_ranking")}
                        </Table.HeadCell>
                    </Table.Head>
                    <div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                    </div>
                    <Table.Body className="divide-y">
                        {filteredData.map((row) => (
                            <Table.Row key={row.user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {row.user_id}
                                </Table.Cell>
                                <Table.Cell>{row.displayed_name}</Table.Cell>
                                <Table.Cell>{row.total_reviews}</Table.Cell>
                                <Table.Cell>{row.total_ratings}</Table.Cell>
                                <Table.Cell>{row.total_likes}</Table.Cell>
                                <Table.Cell>{row.points}</Table.Cell>
                                <Table.Cell>{row.member_ranking}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};