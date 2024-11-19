import { useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";

import { Select } from "flowbite-react";


export default function EditForm({ openModal, setOpenModal, movieInfo }) {
    // console.log(data);
    // const [movieInfo, setMovieInfo] = useState(data);

    // let [movieInfo, setMovieInfo] = useState(JSON.parse(JSON.stringify(data)));
    // console.log(movieInfo);

    // let movieInfo = JSON.parse(JSON.stringify(data));

    const mpa_ratings = ["G", "PG", "PG-13", "R", "NC-17"];
    return (
        <Modal show={openModal} size="3xl" onClose={() => { setOpenModal(false) }} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Movie with ID {movieInfo.id}</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Movie Title" />
                        </div>
                        <TextInput
                            id="title"
                            placeholder="Enter movie title"
                            defaultValue={movieInfo.title}
                            required
                        />
                    </div>


                    <div className="flex flex-row justify-between">

                        <div className="mb-2 mr-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="country" value="Country" />
                            </div>
                            <TextInput
                                id="country"
                                placeholder="Enter country"
                                defaultValue={movieInfo.country}
                                // onChange={(e) => setMovieInfo({ ...movieInfo, country: e.target.value })}
                                required />
                        </div>

                        <div className="mb-2 mx-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="budget" value="Budget" />
                            </div>
                            <TextInput
                                id="budget"
                                placeholder="Enter budget"
                                defaultValue={movieInfo.budget}
                                required />
                        </div>

                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="mpa_rating" value="MPA Rating" />
                            </div>
                            <Select id="countries" required>
                                {mpa_ratings.map((rating) => (
                                    <option key={rating} value={rating} selected={rating==movieInfo.mpa_rating}>
                                        {rating}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="mb-2 block">
                        <div>
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput
                            id="description"
                            placeholder="Enter description"
                            defaultValue={movieInfo.description}
                            required />
                    </div>

                    <div className="flex flex-row justify-between">

                        <div className="mb-2 mr-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="released_year" value="Released Year" />
                            </div>
                            <TextInput
                                id="released_year"
                                placeholder="Enter released year"
                                defaultValue={movieInfo.released_year}
                                required />
                        </div>
                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="studio_id" value="Studio ID" />
                            </div>
                            <TextInput
                                id="studio_id"
                                placeholder="Enter studio ID"
                                defaultValue={movieInfo.studio_id}
                                required />
                        </div>
                    </div>

                    <div className="w-full">
                        <Button>Submit</Button>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
}
