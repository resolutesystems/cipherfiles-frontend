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

export function Tos() {
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
            <h2 class="text-center font-bold text-3xl mb-2">Terms of Service</h2>
            <p class="p-footer font-light">Because we are privacy-conscious and value sharing freedom, we aim for as few restrictions as possible:</p>
            <ul class="list-decimal pl-10 font-light">
                <li>Don't abuse service exploits, if you find any please report it.</li>
                <li>Uploading illegal or copyrighted content is forbidden.</li>
            </ul>
            <h2 class="text-center font-bold text-3xl mb-2 mt-7">Privacy Policy</h2>
            <p class="font-light">We do not collect data, use cookies, employ analytics, show ads, or maintain logs. All files uploaded to the service can be encrypted using an unbreakable cipher, and only you possess the decryption key.</p>
        </div>
    );
};