import { useState, useEffect } from 'preact/hooks';
import { useTranslations } from '../../components/i18n';
import { File } from '../../components/File';
import { API_URL } from '../../components/helpers';

export function History() {
    const { translatedText } = useTranslations();
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setUploadedFiles(JSON.parse(storedFiles));
        }
    }, []);

    // TODO(stan): Checking if files that are in the history exist

    // useEffect(() => {
    //     const interval = setInterval(fetchFileStatuses, 60000);
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     uploadedFiles.forEach(async (file) => {
    //         try {
    //             const response = await fetch(`${API_URL}/info/${file.id}`);
    //             if (!response.ok) {
    //                 const data = await response.json();
    //                 if (data.errorCode) {
    //                     removeFileFromHistory(file.id);
    //                 }
    //             } else {
    //                 const data = await response.json();
    //                 let expiresAt = null;
    //                 if (data.expiresAt && data.expiresAt !== "null") {
    //                     if (data.expiresAt.startsWith("Expires after")) {
    //                         expiresAt = data.expiresAt;
    //                     } else {
    //                         expiresAt = new Date(data.expiresAt).toISOString();
    //                     }
    //                 }
    //                 const updatedFile = {
    //                     ...file,
    //                     expiresAt: expiresAt,
    //                     remainingTime: expiresAt ? calculateTimeRemaining(expiresAt) : undefined
    //                 };
    //                 updateFileInHistory(updatedFile);
    //             }
    //         } catch (error) {
    //             console.error('Error checking file existence:', error);
    //         }
    //     });
    // }, [uploadedFiles]);

    // const fetchFileStatuses = async () => {
    //     try {
    //         const updatedFiles = await Promise.all(uploadedFiles.map(async (file) => {
    //             try {
    //                 const response = await fetch(`${API_URL}/info/${file.id}`);
    //                 if (!response.ok) {
    //                     if (response.status === 400) {
    //                         return null;
    //                     }
    //                     throw new Error('Network response was not ok.');
    //                 }
    //                 const data = await response.json();
    //                 let expiresAt = null;
    //                 if (data.expiresAt && data.expiresAt !== "null") {
    //                     if (data.expiresAt.startsWith("Expires after")) {
    //                         expiresAt = data.expiresAt;
    //                     } else {
    //                         expiresAt = new Date(data.expiresAt).toISOString();
    //                     }
    //                 }
    //                 return {
    //                     ...file,
    //                     expiresAt: expiresAt,
    //                     remainingTime: expiresAt ? calculateTimeRemaining(expiresAt) : undefined
    //                 };
    //             } catch (error) {
    //                 console.error('Error fetching file status:', error);
    //                 return file;
    //             }
    //         }));

    //         const filteredFiles = updatedFiles.filter(file => file !== null);
    //         setUploadedFiles(filteredFiles);
    //         localStorage.setItem('uploadedFiles', JSON.stringify(filteredFiles));
    //     } catch (error) {
    //         console.error('Error updating file statuses:', error);
    //     }
    // };

    const removeFileFromHistory = (id) => {
        const updatedFiles = uploadedFiles.filter(file => file.id !== id);
        setUploadedFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    };

    // const updateFileInHistory = (updatedFile) => {
    //     const updatedFiles = uploadedFiles.map(file => {
    //         if (file.id === updatedFile.id) {
    //             return updatedFile;
    //         }
    //         return file;
    //     });
    //     setUploadedFiles(updatedFiles);
    //     localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    // };

    const calculateTimeRemaining = (expiresAt) => {
        if (!expiresAt) return '';

        const expirationDate = new Date(expiresAt);
        const currentTime = new Date();
        const timeDifference = expirationDate.getTime() - currentTime.getTime();

        if (timeDifference <= 0) {
            return translatedText('Expired');
        }

        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        let remainingTime = '';

        if (days > 0) {
            remainingTime += `${days} ${days === 1 ? translatedText('day') : translatedText('days')}, `;
        }

        if (hours > 0) {
            remainingTime += `${hours} ${hours === 1 ? translatedText('hour') : translatedText('hours')}, `;
        }

        if (minutes > 0 || hours > 0) {
            remainingTime += `${minutes} ${translatedText('minutes')}`;
        }

        if (hours === 0 && minutes < 5 && seconds > 0) {
            remainingTime += ` ${seconds} ${translatedText('seconds')}`;
        }

        return remainingTime.trim();
    };

    return (
        <div>
            <h1 class="text-center text-3xl font-bold mb-1">{translatedText('History')}</h1>
            <div class="my-6 mx-28"></div>
            {uploadedFiles.map((file, index) => (
                <div key={index}>
                    <div class="my-3 mx-28"></div>
                    <File
                        name={file.name}
                        size={file.size}
                        progress={null}
                        canRemove={true}
                        onRemove={() => removeFileFromHistory(file.id)}
                    />
                    <div class="my-3 mx-28"></div>
                    <div class="text-right">
                        {file.expiresAt && !file.expiresAt.startsWith('Expires after') ? (
                            <p class="text-white/50 text-md">
                                Expires after {calculateTimeRemaining(file.expiresAt)}
                            </p>
                        ) : null}
                        {file.expiresAt && file.expiresAt.startsWith('Expires after') && (
                            <p class="text-white/50 text-md">
                                {`${translatedText('Expires after')} ${file.expiresAt.match(/\d+/)[0]} ${translatedText('downloads')}`}
                            </p>
                        )}
                        {!file.expiresAt && (
                            <p class="text-white/50 text-md">{translatedText('Never expires')}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

