import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { useTranslations } from '../../components/i18n';

export function DeletePage() {
    const { translatedText } = useTranslations();

    const { params } = useRoute();
    const defaultUploadId = params.upload_id || '';

    const queryParams = new URLSearchParams(window.location.search);
    const defaultDeleteKey = queryParams.get('key') || '';

    const [uploadId, setUploadId] = useState(defaultUploadId);
    const [deleteKey, setDeleteKey] = useState(defaultDeleteKey);

    const [deleting, setDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUploadId(defaultUploadId);
        setDeleteKey(defaultDeleteKey);
    }, [defaultUploadId, defaultDeleteKey]);

    const handleUploadIdChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (target && target.value) {
            setUploadId(target.value);
        }
    };

    const handleDeleteKeyChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (target && target.value) {
            setDeleteKey(target.value);
        }
    };

    const handleConfirm = async (e: Event) => {
        e.preventDefault();
        try {
        const response = await fetch(`http://127.0.0.1:3000/delete/${uploadId}?key=${deleteKey}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setDeleting(true);
            
            setTimeout(() => {
                route('/deleted', true);
            }, 5000);
        } else {
            const data = await response.json();
            setErrorMessage(data);
        }
        } catch (error) {
            setErrorMessage(translatedText('An error occurred while deleting the file.'));
            console.error('Error occurred:', error);
        }
    };

    return (
        <div>
        <h1 className="text-center text-3xl font-bold mb-1">{translatedText('Remove your files')}</h1>

        <form onSubmit={handleConfirm} style={{ cursor: deleting ? 'not-allowed' : 'auto' }}>
        <div className="mb-4">
            <label htmlFor="uploadId" className="text-white/50 text-md">{translatedText('Upload ID')}</label>
            <input
                id="uploadId"
                type="text"
                value={uploadId}
                onChange={handleUploadIdChange}
                className={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white ${deleting ? 'cursor-not-allowed' : ''}`}
                disabled={deleting}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="deleteKey" className="text-white/50 text-md">{translatedText('Delete key')}</label>
            <input
                id="deleteKey"
                type="text"
                value={deleteKey}
                onChange={handleDeleteKeyChange}
                className={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-left break-all bg-transparent text-white ${deleting ? 'cursor-not-allowed' : ''}`}
                disabled={deleting}
            />
        </div>
            <div className="mb-6">
                <button type="submit" className={`border border-white whiteshadow px-3 py-3 rounded-md w-full text-center break-all ${deleting ? 'cursor-not-allowed' : ''}`} disabled={deleting}>
                    {deleting ? translatedText('Deleting...') : translatedText('Confirm')}
                </button>
            </div>
        </form>


        {errorMessage && (
            <>
                <div class="my-2 mx-28"></div>
                <p className="text-md text-center text-red-500">{errorMessage}</p>
            </>
        )}
        </div>
    );
}
