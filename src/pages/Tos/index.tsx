import { gsap } from 'gsap'
import { useEffect } from 'preact/hooks';
import { useTranslations } from '../../components/i18n';

export function Tos() {
    const { translatedText } = useTranslations();

    useEffect(() => {
        gsap.fromTo('#gay', {
            translateX: '-=100',
        }, {
            translateX: '0', duration: .3, ease: 'back', stagger: .2,
        })
    })

    return (
        <div id={"gay"}>
            <h2 class="text-center font-bold text-3xl mb-2">{translatedText('Terms of Service')}</h2>
            <p class="p-footer font-light">{translatedText('Because we are privacy-conscious and value sharing freedom, we aim for as few restrictions as possible:')}</p>
            <ul class="list-decimal pl-10 font-light">
                <li dangerouslySetInnerHTML={{ __html: translatedText('Don\'t abuse service exploits, if you find any <a href=\"/report-abuse\">please report it.</a>') }}></li>
                <li>{translatedText('Uploading illegal or copyrighted content is forbidden.')}</li>
            </ul>
            <h2 class="text-center font-bold text-3xl mb-2 mt-7">{translatedText('Privacy Policy')}</h2>
            <p class="font-light">{translatedText('We do not collect data, use cookies, employ analytics, show ads, or maintain logs. All files uploaded to the service can be encrypted using an unbreakable cipher, and only you possess the decryption key.')}</p>
        </div>
    );
};