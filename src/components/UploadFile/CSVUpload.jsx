import { Storage } from 'aws-amplify';

// Valid file types (CSV, XLS, XLSX)
const allowedFileTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const maxFileSize = 4 * 1024 * 1024; // 4MB

// Function to check if a file exists in S3 bucket
// const checkIfFileExists = async (fileName) => {
//     try {
//         await Storage.get(fileName);
//         return true; // File exists
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return false; // File does not exist
//         }
//         throw error; // Some other error occurred
//     }
// };

// Function to generate a unique filename
// const generateUniqueFileName = async (fileName) => {
//     let uniqueFileName = fileName;
//     let fileExists = await checkIfFileExists(uniqueFileName);
//     let counter = 1;

//     // Keep appending a number until a unique filename is found
//     while (fileExists) {
//         const fileExtension = uniqueFileName.substring(uniqueFileName.lastIndexOf('.'));
//         const fileNameWithoutExtension = uniqueFileName.substring(0, uniqueFileName.lastIndexOf('.'));
//         uniqueFileName = `${fileNameWithoutExtension}-${counter}${fileExtension}`;
//         fileExists = await checkIfFileExists(uniqueFileName);
//         counter++;
//     }

//     return uniqueFileName;
// };

// Function to validate file type and size
const validateFile = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only CSV, XLS, and XLSX files are allowed.');
    }
    if (file.size > maxFileSize) {
        throw new Error(`File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB.`);
    }
};

// Function to upload the file to the default S3 bucket
const CSVUpload = async (file, institutionId, fileNameForBucket) => {
    try {
        validateFile(file);

        // const uniqueFileName = await generateUniqueFileName(file.name);
        console.log('Uploading file:', file);

        // Use Storage.put to upload the file to S3
        const result = await Storage.put(`${institutionId}/${fileNameForBucket}/${file.name}`, file, {
            contentType: file.type,
            level: 'private',
        });

        console.log('File uploaded successfully:', result);
        alert("File uploaded successfully");
    } catch (error) {
        console.error('Error uploading file:', error);
        // eslint-disable-next-line no-template-curly-in-string
        alert(`Error uploading file: ${ error.message }`);
    }
};

export { CSVUpload };
