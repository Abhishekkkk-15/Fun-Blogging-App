import React, { useState } from "react";
import { updateUserProfile } from "../services/api";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../app/Slices/userSlice";

const EditProfile = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // For image preview
    const [error, setError] = useState('')
    const location = useLocation();
    const user = location?.state?.user || {};

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);

            // Generate a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", fullName );
        formData.append("userName", username);
        formData.append("bio", bio);
        formData.append("avatar", profilePicture);


        await updateUserProfile(formData)
            .then((res) => {
                // dispatch(setUser(res.data))
                alert("User updated!")
            })
            .catch((err) => {
                setError(err.response.data.msg)
                    console.error(err)

            });

    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6  shadow-md rounded-lg mb-16">
            <h2 className="text-2xl font-semibold  mb-6 text-center">
                Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="text-center">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                    ) : (
                        <img
                            src={user.avatar || "https://via.placeholder.com/150"}
                            alt="Current Avatar"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                    )}
                    <label
                        htmlFor="profilePicture"
                        className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm hover:from-blue-600 hover:to-purple-600 transition cursor-pointer"
                    >
                        Upload Profile Picture
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block  font-medium">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full mt-2 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={user.name || "Full Name"}
                    />
                </div>

                {/* Username */}
                <div>
                    <label htmlFor="username" className="block  font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-2 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={user.userName || "Username"}
                    />
                </div>

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block  font-medium">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full mt-2 px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={user.bio || "Write your bio here..."}
                        rows="3"
                    ></textarea>
                </div>
                {error && (
                    <div className="bg-red-100 text-red-800 border-l-4 border-red-500 p-2 mb-4">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 m-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
