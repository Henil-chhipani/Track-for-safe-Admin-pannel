const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");


const storage = getStorage();


const uploadProfile = async (firstname,lastname,file) => {

    // Upload Profile Photo on Firebase Storage

    const storageRef = ref(storage, `Admin Profiles/${firstname + " " + lastname + "_profileImg"}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');

}

module.exports = uploadProfile;