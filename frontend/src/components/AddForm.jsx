import { useState } from "react";
import { Label, Modal, TextInput, Button } from "flowbite-react";

import { Select } from "flowbite-react";
import { set, useForm } from "react-hook-form";
import axios from 'axios';
import axiosAuthInstance from "../api/axiosAuthInstance";


export default function AddForm({ openModal, setOpenModal, setAlert, setAlertMessage, setSuccess, setFetchData }) {
    // console.log(data);
    // const [movieInfo, setMovieInfo] = useState(data);

    // let [movieInfo, setMovieInfo] = useState(JSON.parse(JSON.stringify(data)));
    // console.log(movieInfo);

    // let movieInfo = JSON.parse(JSON.stringify(data));
    let { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        
        // e.preventDefault();
        axiosAuthInstance.post(`https://puppypilm.tatrungtin.id.vn/api/movies`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("Add movie success:", response);
                setAlert(true);
                setAlertMessage(response.data.message);
                setSuccess(response.data.success);
                setFetchData(true);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Add movie error:", error);
                setAlert(true);
                setAlertMessage(error.response.data.message);
                setSuccess(error.response.data.success);


            });
        setOpenModal(false);
        };

    const mpa_ratings = ["G", "PG", "PG-13", "R", "NC-17"];
    return (
        <Modal show={openModal} size="3xl" onClose={() => { setOpenModal(false) }} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add a new Movie</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Movie Title" />
                        </div>
                        <TextInput
                            id="title"
                            placeholder="Enter movie title"
                            {...register("title")}
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
                                // onChange={(e) => setMovieInfo({ ...movieInfo, country: e.target.value })}
                                {...register("country")}
                                required />
                        </div>

                        <div className="mb-2 mx-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="budget" value="Budget" />
                            </div>
                            <TextInput
                                id="budget"
                                placeholder="Enter budget"
                                {...register("budget")}
                                required />
                        </div>

                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="mpa_rating" value="MPA Rating" />
                            </div>
                            <Select id="mpa_rating" {...register("mpaRating")} required>
                                {mpa_ratings.map((rating) => (
                                    <option key={rating} value={rating}>
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
                            {...register("description")}
                            required/>
                    </div>

                    <div className="flex flex-row justify-between">

                        <div className="mb-2 mr-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="released_year" value="Released Year" />
                            </div>
                            <TextInput
                                id="released_year"
                                placeholder="Enter released year"
                                {...register("releasedYear")}
                                required />
                        </div>
                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="studio_id" value="Studio ID" />
                            </div>
                            <TextInput
                                id="studio_id"
                                placeholder="Enter studio ID"
                                {...register("studioId")}
                                required />
                        </div>
                    </div>

                    <div className="w-full">
                        <Button type="submit">Add</Button>
                    </div>
                    </form>

                </div>
            </Modal.Body>
        </Modal>
    );
}