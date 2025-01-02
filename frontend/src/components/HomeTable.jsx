import { useEffect, useState } from 'react';
import { Table, TextInput, Button, Select } from 'flowbite-react';
import axios from 'axios';
export default function MovieTable() {
    const [data, setData] = useState([]);

    // {
    //     title: 'Breaking Bad - Season 1',
    //     description:
    //         'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.',
    //     mpa_rating: 'R',
    //     released_year: 2008,
    //     studio: 'bk_entertainment',
    //     trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
    //     genre: ['action', 'animation', 'comedy'],
    //     rate: '9',
    // },
    // {
    //     title: "Schindler's List",
    //     description:
    //         'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    //     mpa_rating: 'PG-13',
    //     released_year: 1993,
    //     studio: 'bk_film',
    //     trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
    //     genre: ['action', 'animation', 'drama', 'experimental'],
    //     rate: '8',
    // },
    // {
    //     title: "Singin' in the Rain",
    //     description:
    //         'A silent film star falls for a chorus girl when he and his jealous screen partner are trying to make the difficult transition to talking pictures in 1920s Hollywood.',
    //     mpa_rating: 'G',
    //     released_year: 1952,
    //     studio: 'bk_entertainment',
    //     trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
    //     genre: ['action', 'comedy'],
    //     rate: '2',
    // },
    // {
    //     title: 'Breaking Bad - Season 2',
    //     description:
    //         'Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them first.',
    //     mpa_rating: 'NC-17',
    //     released_year: 2009,
    //     studio: 'bk_film',
    //     trailer: 'https://www.youtube.com/watch?v=t06RUxPbp_c',
    //     genre: ['animation', 'comedy'],
    //     rate: '3',
    // }
    // State for search terms
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAge, setSearchAge] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchCountry, setSearchCountry] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [searchRate, setSearchRate] = useState('');

    // State for filtered data
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios
            .get('https://puppypilm.tatrungtin.id.vn/api/movies')
            .then((res) => {
                setData(res.data.data); // Dữ liệu từ API
                setFilteredData(res.data.data);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error); // Log lỗi
            });
    }, []);
    const handleSearch = () => {
        const queryParams = [
            searchTitle && `title=${searchTitle}`,
            searchAge && `age=${searchAge}`,
            searchYear && `releasedYear=${searchYear}`,
            searchCountry && `countryName=${searchCountry}`,
            searchRate && `rating=${searchRate}`,
        ]
            .filter(Boolean)
            .join('&');

        axios
            .get(`https://puppypilm.tatrungtin.id.vn/api/movies?${queryParams}`)
            .then((res) => {
                setData(res.data.data); // Dữ liệu từ API
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    useEffect(() => {
        const searchGenres = searchGenre
            .toLowerCase()
            .split(', ')
            .filter((genre) => genre !== '');

        const result = data.filter((row) => {
            const isGenreMatch =
                searchGenres.every((genre) =>
                    row.genres.map((g) => g?.toLowerCase()).includes(genre)
                ) || searchGenre === '';
            return isGenreMatch;
        });

        setFilteredData(result);
    }, [data, searchGenre]);

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
                            Country
                        </label>
                        <TextInput
                            type="text"
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            className="mb-2"
                            placeholder="Search by Country"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Released Year
                        </label>
                        <TextInput
                            type="number"
                            value={searchYear}
                            onChange={(e) => setSearchYear(e.target.value)}
                            className="mb-2"
                            placeholder="Greater Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Age
                        </label>
                        <TextInput
                            type="number"
                            value={searchAge}
                            onChange={(e) => setSearchAge(e.target.value)}
                            className="mb-2"
                            placeholder="Less Than..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Genre
                        </label>
                        <TextInput
                            type="text"
                            value={searchGenre}
                            onChange={(e) => setSearchGenre(e.target.value)}
                            className="mb-2"
                            placeholder="action, comedy, ..."
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Rate
                        </label>
                        <Select
                            value={searchRate}
                            onChange={(e) => setSearchRate(e.target.value)}
                            className="mb-2"
                            placeholder="Select Rate"
                        >
                            <option value="">Select Rate</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </Select>
                    </div>
                    <div className="flex justify-start">
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>
            </form>

            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Number</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>MPA Rating</Table.HeadCell>
                        <Table.HeadCell>Released Year</Table.HeadCell>
                        <Table.HeadCell>Studio</Table.HeadCell>
                        <Table.HeadCell>Country</Table.HeadCell>
                        <Table.HeadCell>Trailer</Table.HeadCell>
                        <Table.HeadCell>Genre</Table.HeadCell>
                        <Table.HeadCell>Rate</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {filteredData.map((row, index) => (
                            <Table.Row
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="text-center">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell>{row.title ?? 'N/A'}</Table.Cell>
                                <Table.Cell>
                                    {row.description ?? 'N/A'}
                                </Table.Cell>
                                <Table.Cell>
                                    {row.mpa_rating ?? 'N/A'}
                                </Table.Cell>
                                <Table.Cell>
                                    {row.released_year ?? 'N/A'}
                                </Table.Cell>
                                <Table.Cell>{row.studio ?? 'N/A'}</Table.Cell>
                                <Table.Cell>{row.country ?? 'N/A'}</Table.Cell>
                                <Table.Cell>
                                    <a
                                        href={row.trailer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Link
                                    </a>
                                </Table.Cell>
                                <Table.Cell>
                                    {row.genres?.join(', ')}
                                </Table.Cell>
                                <Table.Cell className="text-center">
                                    {row.average_rate
                                        ? Number(row.average_rate).toFixed(1)
                                        : 'N/A'}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
