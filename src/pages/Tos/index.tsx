import { gsap } from 'gsap'
import { useEffect } from 'preact/hooks';

export function Tos() {

    useEffect(() => {
        gsap.fromTo('#gay', {
            translateX: '-=100',
        }, {
            translateX: '0', duration: .3, ease: 'back', stagger: .2,
        })
    })

    return (
        <div id={"gay"}>
            <h2 class="text-center font-bold text-3xl mb-2">Terms of Service</h2>
            <p class="p-footer font-light">Because we are privacy-conscious and value sharing freedom, we aim for as few restrictions as possible:</p>
            <ul class="list-decimal pl-10 font-light">
                <li>Don't abuse service exploits, if you find any <a href="/report-abuse">please report it.</a></li>
                <li>Uploading illegal or copyrighted content is forbidden.</li>
            </ul>
            <h2 class="text-center font-bold text-3xl mb-2 mt-7">Privacy Policy</h2>
            <p class="font-light">We do not collect data, use cookies, employ analytics, show ads, or maintain logs. All files uploaded to the service can be encrypted using an unbreakable cipher, and only you possess the decryption key.</p>
        </div>
    );
};