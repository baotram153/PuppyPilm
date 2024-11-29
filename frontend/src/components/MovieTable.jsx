import { useState } from "react";
import { Checkbox, Table, Button} from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

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
        const selectedRows = data.filter((row) => checkedRows.has(row.id));
        console.log("Deleted rows:", selectedRows);

        // Remove rows from table
        setData(data.filter((row) => !checkedRows.has(row.id)));
        setCheckedRows(new Set());
    };

    const handleAdd = () => {
        setOpenAddModal(true);
    };



    return (
        <div className="overflow-x-auto">
            <Button className="m-4" onClick={handleAdd}>
                Add Movie
            </Button>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckedRows(new Set(data.map((row) => row.id)));
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
                        <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="p-4">
                                <Checkbox
                                    onChange={() => toggleRow(row.id)}
                                    checked={checkedRows.has(row.id)}
                                />
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {row.id}
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
                                    setEditMovieInfo(row);}
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

            <EditForm openModal={openEditModal} setOpenModal={setOpenEditModal} movieInfo={editMovieInfo}/>
            <AddForm openModal={openAddModal} setOpenModal={setOpenAddModal}/>
        </div>
    );
}
