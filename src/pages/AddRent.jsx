import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities, addRent } from '../actions/actions';
import TestMap from './TestMap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Home from './Home';


export default function AddRent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cities = useSelector(state => state.cities || []);
    const loggedInUser = useSelector(state => state.loggedInUser || []);
    const userId  = loggedInUser.id;
    //const {idUser} = useParams();
    //console.log("id user:", idUser);
    //console.log("user id:", userId);



    //const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [photos, setPhotos] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [errMsg, setErrMsg] = useState('');



    useEffect(() => {
        if (!cities || cities.length === 0) {
            dispatch(fetchCities());
        }
    }, [cities]);



    const convertToBase64 = (photo) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleFileChange = (e) => {
        const uploadedPhotos = Array.from(e.target.files);
        Promise.all(uploadedPhotos.map(convertToBase64))
            .then(base64Images => {
                setPhotos(prevPhotos => [...prevPhotos, ...base64Images]);
            })
            .catch(error => console.error("Error converting image:", error));

        //const uploadedPhotosUrl = uploadedPhotos.map(photo => URL.createObjectURL(photo));
        //setPhotos(prevPhotosUrl => [...prevPhotosUrl, ...uploadedPhotosUrl]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedPhotos = Array.from(e.dataTransfer.files);    //array.from to transform the file list to an array

        Promise.all(droppedPhotos.map(convertToBase64))
            .then(base64Images => {
                setPhotos(prevPhotos => [...prevPhotos, ...base64Images]);
            })
            .catch(error => console.error("Error converting image:", error));

        //const droppedPhotosUrl = droppedPhotos.map(photo => URL.createObjectURL(photo));     //createobjecturl expects just one value and not and array
        //setPhotos(prevPhotosUrl => [...prevPhotosUrl, ...droppedPhotosUrl]);
    }

    const handleRemovePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city=='' || title=='' || description=='' ||selectedPosition==null || price==''){
            setErrMsg('Please fill in all the fields')
            return;
        }
        setErrMsg('');
        const newRent = { title, description, price, city, photos, selectedPosition, userId };
        dispatch(addRent(newRent));
        alert('Rent added successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setCity('');
        setPhotos([]);
        setSelectedPosition(null);
        //navigate(`/all/${idUser}`);
    }


    return (




        <div  >
            <h1 className='text-2xl text-green-700 font-bold text-center underline mb-5'>Add a house to rent</h1>
            <p className='text-red-500 text-center'><small><b>{errMsg}</b></small></p>
            <div className="mb-4 mt-4">
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:flex-row justify-between lg:gap-20'>
                        {/* ADDRESS PART */}
                        <div className='lg:w-1/2 w-full flex flex-col gap-4'>
                            {/* CITY INPUT */}
                            <div className=''>
                                <label htmlFor='city' className='block text-sm font-medium text-gray-700'>City<span className='text-red-500 ml-2'>*</span></label>
                                <select
                                value={city}
                                    id='city'
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option>-- Select a city --</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='h-[310px]'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Find your position<span className='text-red-500 ml-2'>*</span></label>

                                {<TestMap cityName={city} setSelectedPosition={setSelectedPosition} />}
                            </div>
                        </div>

                        {/* DETAILS PART */}
                        <div className='lg:w-1/2 w-full '>
                            <div className='w-full mb-3'>
                                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title<span className='text-red-500 ml-2'>*</span></label>
                                <input value={title}
                                    id='title'
                                    type="text"
                                    placeholder="Give your annonce a title"
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='w-full mb-3'>
                                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description<span className='text-red-500 ml-2'>*</span></label>
                                <textarea value={description}
                                    id='description'
                                    placeholder="Enter a description"
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='w-full mb-3'>
                                <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price<span className='text-red-500 ml-2'>*</span></label>
                                <input value={price}
                                    id='price'
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter the price"
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            {/* UPLAOD PHOTOS */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Photos
                                </label>
                                <div
                                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-sky-500' : 'border-dashed border-gray-300'
                                        } rounded-md`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="upload_photos"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                                            >
                                                <span>Upload a photo </span>
                                                <input
                                                    id="upload_photos"
                                                    name="photos"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                    multiple 
                                                />
                                            </label>
                                            <p className="pl-1"> &nbsp; or drag and drop</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* DISPLAY SELECTED PHOTOS */}
                    <div className='mt-6'>
                        {photos.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
                                <div
                                    className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full p-2 rounded-lg mx-auto"
                                    style={{ scrollBehavior: "smooth" }}
                                >
                                    {photos.map((photo, index) => (
                                        <div key={index} className="relative flex-shrink-0 lg:w-56 w-[100px] snap-center group">
                                            <button
                                                className="absolute top-1 right-1 text-gray-900 p-1 text-xs bg-white rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto shadow-md hover:text-red-500 transition duration-300 ease-in-out z-10"
                                                onClick={() => handleRemovePhoto(index)}
                                            >
                                                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                                </svg>
                                            </button>

                                            <img
                                                src={photo}
                                                alt={`Image ${index + 1}`}
                                                className="border-2 border-gray-300 rounded-lg object-cover w-full h-[90px] lg:h-40 transition duration-300 ease-in-out group-hover:grayscale group-hover:brightness-75"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-2 flex justify-end">
                        <input
                            type='submit'
                            value='Add'
                            className="mr-3 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        />
                    </div>

                </form>
            </div>


        </div>



    );
}

//export default AddRent;