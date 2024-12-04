import { useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";

import { Select } from "flowbite-react";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function EditForm({ openModal, setOpenModal, movieInfo, setAlert, setAlertMessage, setSuccess, setFetchData}) {
    // console.log(data);
    // const [movieInfo, setMovieInfo] = useState(inMovieInfo);

    // let [movieInfo, setMovieInfo] = useState(JSON.parse(JSON.stringify(data)));
    // console.log(movieInfo);

    // let movieInfo = JSON.parse(JSON.stringify(data));

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // e.preventDefault();

        axios.patch(`https://puppypilm.tatrungtin.id.vn/api/movies/${movieInfo.movie_id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        }) 
            .then((response) => {
                console.log("Update movie success:", response);
                setAlert(true);
                setAlertMessage(response.data.message);
                setSuccess(response.data.success);
                setFetchData(true);
            })
            .catch((error) => {
                console.error("Update movie error:", error);
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
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Movie with ID {movieInfo.movie_id}</h3>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Movie Title" />
                        </div>
                        <TextInput
                            id="title"
                            placeholder="Enter movie title"
                            defaultValue={movieInfo.title}
                            required
                            {...register("title")}
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
                                // value={movieInfo.country || ""}
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
                                defaultValue={movieInfo.budget}
                                {...register("budget")}
                                required />
                        </div>

                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="mpaRating" value="MPA Rating" />
                            </div>
                            <Select id="mpaRating" {...register("mpaRating")} required>
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
                            {...register("description")} />
                    </div>

                    <div className="flex flex-row justify-between">

                        <div className="mb-2 mr-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="releasedYear" value="Released Year" />
                            </div>
                            <TextInput
                                id="releasedYear"
                                placeholder="Enter released year"
                                defaultValue={movieInfo.released_year}
                                {...register("releasedYear")}
                                />
                        </div>
                        <div className="mb-2 ml-2 inline-block flex-1">
                            <div>
                                <Label htmlFor="studioId" value="Studio ID" />
                            </div>
                            <TextInput
                                id="studioId"
                                placeholder="Enter studio ID"
                                defaultValue={movieInfo.studio_id}
                                {...register("studioId")}
                                />
                        </div>
                    </div>

                    <div className="w-full">
                        <Button type="submit">Update</Button>
                    </div>
                    </form>

                </div>
            </Modal.Body>
        </Modal>
    );
}
