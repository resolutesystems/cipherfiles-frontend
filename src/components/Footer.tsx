import { useState, useEffect } from 'preact/hooks';
import { gsap } from 'gsap';
import { COMMUNITY_URL, FOOTER_QUOTE } from './helpers';
import { useTranslations as useTranslationsBase } from './i18n';

export function Footer() {
    const { translatedText } = useTranslationsBase();
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

    useEffect(() => {
        const langFromStorage = localStorage.getItem('lang');
        if (langFromStorage) {
            setLanguage(langFromStorage);
        }

        gsap.fromTo('#footer', {
            translateY: '+=50', autoAlpha: 0, scale: .8,
        }, {
            translateY: 0, autoAlpha: 1, scale: 1, duration: .4, ease: 'back', delay: .4, stagger: .1,
        });
    }, []);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('lang', lang);
        window.location.href = '/';
    };

    return (
        <div id="footer" style={{ width: '690px', maxWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ maxWidth: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src="../../src/assets/langs/us.png" alt="English" title="English" style={{ width: '25px', cursor: 'pointer', filter: language === 'en' ? 'none' : 'grayscale(100%)'}} onClick={() => handleLanguageChange('en')} />
                <img src="../../src/assets/langs/pl.png" alt="Polski" title="Polski" style={{ width: '25px', cursor: 'pointer', marginLeft: '5px', filter: language === 'pl' ? 'none' : 'grayscale(100%)' }} onClick={() => handleLanguageChange('pl')} />
                <img src="../../src/assets/langs/ru.png" alt="Русский" title="Русский" style={{ width: '25px', cursor: 'pointer', marginLeft: '5px', filter: language === 'ru' ? 'none' : 'grayscale(100%)' }} onClick={() => handleLanguageChange('ru')} />
                <img src="../../src/assets/langs/fr.png" alt="Français" title="Français" style={{ width: '25px', cursor: 'pointer', marginLeft: '5px', filter: language === 'fr' ? 'none' : 'grayscale(100%)' }} onClick={() => handleLanguageChange('fr')} />
                <img src="../../src/assets/langs/jp.png" alt="日本語" title="日本語" style={{ width: '25px', cursor: 'pointer', marginLeft: '5px', filter: language === 'jp' ? 'none' : 'grayscale(100%)' }} onClick={() => handleLanguageChange('jp')} />
                <img src="../../src/assets/langs/de.png" alt="Deutsch" title="Deutsch" style={{ width: '25px', cursor: 'pointer', marginLeft: '5px', filter: language === 'de' ? 'none' : 'grayscale(100%)' }} onClick={() => handleLanguageChange('de')} />
            </div>
            <ul class="flex gap-3" style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
                <a class="text-neutral-500" href="/">{translatedText('home')}</a>
                <li><a class="text-neutral-500" href="/tos">{translatedText('tos')}</a></li>
                <li><a class="text-neutral-500" href="/report-abuse">{translatedText('report abuse')}</a></li>
                <li><a class="text-neutral-500" href="/faq">{translatedText('faq')}</a></li>
                <li><a class="text-neutral-500" href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">{translatedText('our community')}</a></li>
            </ul>
            <p class="text-neutral-500 text-sm">{FOOTER_QUOTE}</p>
        </div>
    );
}
