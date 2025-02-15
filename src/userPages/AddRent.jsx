import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities } from '../actions/actions';

export default function AddRent() {
    const [isOpen, setIsOpen] = useState(false);
    const cities = useSelector(state => state.cities || []);
    const dispatch = useDispatch();

    console.log(cities)

    //const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

   useEffect(() => {
           dispatch(fetchCities);
         }, [dispatch]);

   
         const [files, setFiles] = useState([]);
         const [isDragging, setIsDragging] = useState(false);
       
         // Handle file selection via input
         const handleFileChange = (e) => {
           const selectedFiles = Array.from(e.target.files);
           setFiles(selectedFiles);
           console.log(selectedFiles); // Do something with the files
         };
       
         // Handle drag over event
         const handleDragOver = (e) => {
           e.preventDefault();
           setIsDragging(true);
         };
       
         // Handle drag leave event
         const handleDragLeave = () => {
           setIsDragging(false);
         };
       
         // Handle drop event
         const handleDrop = (e) => {
           e.preventDefault();
           setIsDragging(false);
       
           const droppedFiles = Array.from(e.dataTransfer.files);
           setFiles(droppedFiles);
           console.log(droppedFiles); // Do something with the files
           }

    return (
        <div>
            {/* Button to open the modal */}
            <button
                onClick={() => { setIsOpen(true) }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Open Modal
            </button>

            {/* Modal Overlay and Container */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-[1200px] p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add a house to rent</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-lg"
                            >
                                X
                            </button>
                        </div>

                        <div className="mb-4">
                            <form>
                                <div>
                                    <div className=''>
                                        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title</label>
                                        <input required
                                            id='title'
                                            type="text"
                                            placeholder="Give your annouce a title"
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                            
                                        />
                                    </div>
                                    <div className=''>
                                        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                                        <textarea
                                            id='description'
                                            placeholder="Enter a description"
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"

                                        ></textarea>
                                    </div>
                                </div>

                                <div>
                                    <div className=''>
                                        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>city</label>
                                        <select 
                                            id='city'
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
                                            <option>-- Select a city --</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className=''>
                                        <label htmlFor='photos' className='block text-sm font-medium text-gray-700'>upload photos</label>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            id='photos'
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"

                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                                            Upload Photos
                                        </label>
                                        <div
                                            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                                            isDragging ? 'border-sky-500' : 'border-dashed border-gray-300'
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
                                                htmlFor="photos"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                                                >
                                                <span>Upload a file</span>
                                                <input
                                                    id="photos"
                                                    name="photos"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                    multiple // Allow multiple files
                                                />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>

                                        {/* Display uploaded files */}
                                        {files.length > 0 && (
                                            <div className="mt-4">
                                            <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
                                            <ul className="mt-2 space-y-2">
                                                {files.map((file, index) => (
                                                <li key={index} className="text-sm text-gray-600">
                                                    {file.name}
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                

                                <div className='text-center mt-5'>
                                    <small>First time here ? <a href='' className='text-blue-500'><b>Sign up !</b></a></small>
                                </div>


                                <input
                                    type="submit"
                                    value="Sign In"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                                />
                            </form>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >Close</button>

                            <button
                                onClick={() => alert('Action performed!')}
                                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

//export default AddRent;