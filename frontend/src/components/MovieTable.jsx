import { useEffect, useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";

import EditForm from "./EditForm";
import AddForm from "./AddForm";
import axios from "axios";

import axiosAuthInstance from "../api/axiosAuthInstance";

export default function MovieTable() {
    const [data, setData] = useState([]);

    const [checkedRows, setCheckedRows] = useState(new Set());
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editMovieInfo, setEditMovieInfo] = useState({});

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [fetchData, setFetchData] = useState(false);

    function handleDataChange() {
        axiosAuthInstance
            .get("/movies/all")
            .then((response) => {
                console.log("Fetched Data:", response.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.error("Fetch data error:", error);
            }
            );
    }
    useEffect(handleDataChange, []);

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
            axiosAuthInstance
                .delete(`https://puppypilm.tatrungtin.id.vn/api/movies/${movie_id}`)
                .then((response) => {
                    console.log('Movie deleted successfully:', response.data);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setSuccess(response.data.success);
                    setFetchData(true);
                    handleDataChange();
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
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
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
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">{alertMessage}</span>
                            </div>
                        </div>
                    )
                    }
                    <h2 className="text-2xl font-bold mb-6 text-red-500">Movie Management</h2>
                    <div className="flex flex-row justify-center">
                        <Button className="mt-6 bg-red-600 hover:bg-red-700 text-white m-4" onClick={handleAdd}>
                            Add Movie
                        </Button>
                    </div>
                    </div>

                    <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <Table.Head>
                                    
                                        <Table.HeadCell className="border-zinc-700 bg-zinc-800 text-gray-400">
                                            <Checkbox
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setCheckedRows(new Set(data.map((row) => row.movie_id)));
                                                    } else {
                                                        setCheckedRows(new Set());
                                                    }
                                                }}
                                                checked={checkedRows.size === data.length}
                                                className="text-red-700 focus:ring-red-700"
                                            />
                                        </Table.HeadCell>

                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Movie ID</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Country</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Budget</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Title</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Description</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">MPA Rating</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Released Year</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Studio ID</Table.HeadCell>
                                        <Table.HeadCell className="p-4 border-zinc-700 bg-zinc-800 text-gray-400">Action</Table.HeadCell>
                                   
                                </Table.Head>


                                <Table.Body className="divide-y">
                                    {data.map((row) => (
                                        <Table.Row key={row.movie_id} className="border-zinc-700">
                                            <Table.Cell>
                                                <Checkbox
                                                    onChange={() => toggleRow(row.movie_id)}
                                                    checked={checkedRows.has(row.movie_id)}
                                                    className="text-red-700  focus:ring-red-700"
                                                />
                                            </Table.Cell>
                                            <Table.Cell className="text-white py-4">
                                                {row.movie_id}
                                            </Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.country}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.budget}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.title}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.description}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.mpa_rating}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.released_year}</Table.Cell>
                                            <Table.Cell className="text-white py-4">{row.studio_id}</Table.Cell>
                                            <Table.Cell className="text-white py-4">
                                                <Button onClick={() => {
                                                    setOpenEditModal(true);
                                                    setEditMovieInfo(row);
                                                }
                                                }
                                                    href="#" className="font-medium text-white bg-red-700 hover:bg-red-800 hover:scale-105">
                                                    Edit
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <Button
                        className="font-medium text-white bg-red-700 hover:bg-red-800 hover:scale-105"
                        onClick={handleDelete}
                        disabled={checkedRows.size === 0}>Delete
                    </Button>


                    <EditForm openModal={openEditModal} setOpenModal={setOpenEditModal} movieInfo={editMovieInfo} setAlert={setAlert} setAlertMessage={setAlertMessage} setSuccess={setSuccess} setFetchData={setFetchData} />
                    <AddForm openModal={openAddModal} setOpenModal={setOpenAddModal} setAlert={setAlert} setAlertMessage={setAlertMessage} setSuccess={setSuccess} setFetchData={setFetchData} />
            </div>
        </div>
    );
}
