import { useEffect, useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import axios from "axios";

export default function MovieTable() {
    const [data, setData] = useState(
        [
            {
                id: 1,
                country: "United States",
                budget: 200,
                title: "Breaking Bad - Season 1",
                description: "Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.",
                mpa_rating: "R",
                released_year: 2008,
                studio_id: 1
            },
            {
                id: 2,
                country: "Germany",
                budget: 500,
                title: "Schindler's List",
                description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
                mpa_rating: "PG-13",
                released_year: 1993,
                studio_id: 2
            },
            {
                id: 3,
                country: "England",
                budget: 700,
                title: "Singin' in the Rain",
                description: "A silent film star falls for a chorus girl when he and his jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.",
                mpa_rating: "G",
                released_year: 1952,
                studio_id: 3
            },
            {
                id: 4,
                country: "United States",
                budget: 300,
                title: "Breaking Bad - Season 2",
                description: "Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them first.",
                mpa_rating: "NC-17",
                released_year: 2009,
                studio_id: 1
            }
        ]);

    const [checkedRows, setCheckedRows] = useState(new Set());
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editMovieInfo, setEditMovieInfo] = useState({});

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [fetchData, setFetchData] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://puppypilm.tatrungtin.id.vn/api/movies/all");
                console.log("Fetched Data:", response.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Fetch data error:", error);
            }
        }
        fetchData();
        return () => {setFetchData(false)};
    }, [fetchData]);

    const toggleRow = (id) => {
        setCheckedRows((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    };

    

    const handleDelete = () => {
        const selectedRows = data.filter((row) => checkedRows.has(row.movie_id));
        console.log("Deleted rows:", selectedRows);

        // for (let movie_id of checkedRows) {
        //     console.log(movie_id);
        // }

        // Remove rows from table
        // setData(data.filter((row) => !checkedRows.has(row.movie_id)));
        for (let movie_id of checkedRows) {
            axios
                .delete(`https://puppypilm.tatrungtin.id.vn/api/movies/${movie_id}`)
                .then((response) => {
                    console.log('Movie deleted successfully:', response.data);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setSuccess(response.data.success);
                    setFetchData(true);
                    // You can update your state or UI here if needed
                })
                .catch((error) => {
                    console.error('Error deleting movie:', error.response || error.message);
                    setAlert(true);
                    setAlertMessage(error.response.data.message);
                    setSuccess(error.response.data.success);
                });
        }
        setCheckedRows(new Set());
        
    };

    const handleAdd = () => {
        setOpenAddModal(true);
    };

    return (
        <div className="overflow-x-auto">
            {alert && success && (
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">{alertMessage}</span>
                </div>
            </div>)}

            {alert && !success && (
                <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">{alertMessage}</span>
                </div>
              </div>
            )
            }
            <Button className="m-4" onClick={handleAdd}>
                Add Movie
            </Button>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckedRows(new Set(data.map((row) => row.movie_id)));
                                } else {
                                    setCheckedRows(new Set());
                                }
                            }}
                            checked={checkedRows.size === data.length}
                        />
                    </Table.HeadCell>

                    <Table.HeadCell>Movie ID</Table.HeadCell>
                    <Table.HeadCell>Country</Table.HeadCell>
                    <Table.HeadCell>Budget</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>MPA Rating</Table.HeadCell>
                    <Table.HeadCell>Released Year</Table.HeadCell>
                    <Table.HeadCell>Studio ID</Table.HeadCell>

                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {data.map((row) => (
                        <Table.Row key={row.movie_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="p-4">
                                <Checkbox
                                    onChange={() => toggleRow(row.movie_id)}
                                    checked={checkedRows.has(row.movie_id)}
                                />
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {row.movie_id}
                            </Table.Cell>
                            <Table.Cell>{row.country}</Table.Cell>
                            <Table.Cell>{row.budget}</Table.Cell>
                            <Table.Cell>{row.title}</Table.Cell>
                            <Table.Cell>{row.description}</Table.Cell>
                            <Table.Cell>{row.mpa_rating}</Table.Cell>
                            <Table.Cell>{row.released_year}</Table.Cell>
                            <Table.Cell>{row.studio_id}</Table.Cell>
                            <Table.Cell>
                                <a onClick={() => {
                                    setOpenEditModal(true);
                                    setEditMovieInfo(row);
                                }
                                }
                                    href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Button
                className="mt-4"
                onClick={handleDelete}
                disabled={checkedRows.size === 0}>Delete
            </Button>

            <EditForm openModal={openEditModal} setOpenModal={setOpenEditModal} movieInfo={editMovieInfo} setAlert={setAlert} setAlertMessage={setAlertMessage} setSuccess={setSuccess} setFetchData={setFetchData}/>
            <AddForm openModal={openAddModal} setOpenModal={setOpenAddModal} setAlert={setAlert} setAlertMessage={setAlertMessage} setSuccess={setSuccess} setFetchData={setFetchData}/>
        </div>
    );
}
