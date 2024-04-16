import { gsap } from 'gsap'
import { h, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { File } from '../../components/File';
import { Button } from '../../components/Button';
import { Link } from 'preact-router/match';
import styles from './header.module.scss'
// import File from '../../components/File'; // Popraw ścieżkę do komponentu File
// import Button from '../../components/Button'; // Popraw ścieżkę do komponentu Button
// Importuj funkcję enhance z odpowiedniego miejsca

export function ReportAbuse() {
    const [state, setState] = useState<"selecting" | "uploading" | "uploaded">("selecting");
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
	const [hamburgerOpen, setHamburgerOpen] = useState(false)

    useEffect(() => {
			gsap.fromTo(
				'#home',
				{
					translateX: '-=100',
					autoAlpha: 0,
					scale: .8,
				},
				{
					translateX: 0,
					autoAlpha: 1,
					scale: 1,
					duration: .4,
					ease: 'back',
				})
    })

    const copyDownloadUrl = () => {
        if (downloadUrl) {
            navigator.clipboard.writeText(downloadUrl);
            alert("Copied download url to clipboard!");
        }
    };

    const startUpload = () => {
        // Implementacja logiki przesyłania plików
    };

    return (
        <div>
            <h2 class="text-center font-bold text-3xl mb-2">Report Abuse</h2>
            <p class="p-footer" style="translate: none; rotate: none; scale: none; opacity: 1; visibility: inherit; transform: translate(0px);">
                If you want to report illegal or copyrighted content, please email us at{' '}
                <a class="text-accent" href="mailto:cipherfiles@tutanota.com">cipherfiles@tutanota.com</a>.
                <div class="my-3 mx-28"></div>
            </p>
            Remember to include as much information as possible, including the full download URL (with decryption key) and a description of the content.
        </div>
    );
};