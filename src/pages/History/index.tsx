import { useState, useEffect } from 'preact/hooks';
import { useTranslations } from '../../components/i18n';
import { File } from '../../components/File';
import { WEBSITE_URL, API_URL } from '../../components/helpers';

export function History() {
    const { translatedText } = useTranslations();
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setUploadedFiles(JSON.parse(storedFiles));
        }
    }, []);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setUploadedFiles(JSON.parse(storedFiles));
        }

        const intervalId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const updateRemainingTime = () => {
        setUploadedFiles(prevFiles => {
            const updatedFiles = prevFiles.map(file => {
                if (file.expiresAt) {
                    const remainingTime = calculateTimeRemaining(file.expiresAt);
                    if (remainingTime === translatedText('Expired')) {
                        removeFileFromHistory(file.id);
                    }
                    return {
                        ...file,
                        remainingTime: remainingTime
                    };
                }
                return file;
            });
            return updatedFiles;
        });
    };

    const removeFileFromHistory = (id) => {
        const updatedFiles = uploadedFiles.filter(file => file.id !== id);
        setUploadedFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    };
    
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

        let remainingTime = 'Expires after ';

        if (days > 0) {
            remainingTime += `${days} ${days === 1 ? translatedText('day') : translatedText('days')} `;
        }

        if (hours > 0) {
            remainingTime += `${hours} ${hours === 1 ? translatedText('hour') : translatedText('hours')} `;
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
                    <div class="flex justify-between items-center">
                    <div>
                    <a href={`${WEBSITE_URL}/download/${file.id}`} className="text-white/50 text-md text-left">{translatedText('Download')}</a>
                    </div>
                    <div class="text-right">
                        {file.expiresAt && !file.expiresAt.startsWith('Expires after') ? (
                            <p class="text-white/50 text-md">
                                {calculateTimeRemaining(file.expiresAt)}
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
                </div>
            ))}
        </div>
    );
};
