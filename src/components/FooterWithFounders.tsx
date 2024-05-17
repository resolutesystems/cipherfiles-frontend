import { useTranslations as useTranslationsBase } from './i18n';
import Wordmark from '../assets/Resolute-Systems.png';
import CF from '../assets/Vector.png';
import COMINGSOON from '../assets/COMINGSOON.png';
import { WEBSITE_URL } from './helpers';

export function FooterWithFounders() {
  return (
    <div class="min-h-screen flex items-center justify-center text-center text-white py-5">
    <div class="max-w-xl mx-auto">
        <img src={Wordmark} />
        <br/>
        <h1 class="text-sm text-neutral-500"><strong>PROVIDERS OF</strong></h1>
        <div class="flex justify-center mt-10">
        <div class="w-1/2 flex space-x-5 justify-center">
            <div class="founder flex flex-col items-center">
            <div class="services photo mb-2">
                <a href={WEBSITE_URL}><img class="w-15 h-8" src={CF} /></a>
            </div>
            </div>
            <div class="founder flex flex-col items-center">
            <div class="services photo mb-2">
                <a><img class="w-15 h-8" src={COMINGSOON} /></a>
            </div>
            </div>
        </div>
        </div>
        <br/>
        <h1 class="text-sm text-neutral-500"><strong>FOUNDED BY</strong></h1>
        <div class="flex justify-between mt-10">
        <div class="w-1/2">
            <div class="founder flex flex-col items-center">
            <div class="photo mb-2">
                <a href="https://github.com/stanislawkuriata">
                    <img class="rounded-full w-24 h-24" src="https://github.com/stanislawkuriata.png" />
                </a>
            </div>
            <div>
                <div>
                    <a class="text-2xl hover:text-[#8840FF]" href="https://github.com/stanislawkuriata"><strong>stan</strong></a>
                </div>
            </div>
            </div>
        </div>
        <div class="w-1/2">
            <div class="founder flex flex-col items-center">
            <div class="photo mb-2">
                <a href="https://github.com/HitoIRL">
                    <img class="rounded-full w-24 h-24" src="https://github.com/HitoIRL.png" />
                </a>
            </div>
            <div>
                <div>
                    <a class="text-2xl hover:text-[#8840FF]" href="https://github.com/HitoIRL"><strong>Hito</strong></a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
}
