import { useTranslations as useTranslationsBase } from './i18n';
import Wordmark from '../assets/Resolute-Systems.png';
import CF from '../assets/Vector.png';
import COMINGSOON from '../assets/COMINGSOON.png';
// import COMINGSOON2 from '../assets/Fedora.png';
import { WEBSITE_URL, STAN_SOCIAL, HITO_SOCIAL } from './helpers';

const stanpfp = `${STAN_SOCIAL}.png`
const hitopfp = `${HITO_SOCIAL}.png`

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
            {/* <div class="founder flex flex-col items-center">
            <div class="services photo mb-2">
                <a><img class="w-15 h-8" src={COMINGSOON2} /></a>
            </div>
            </div> */}
        </div>
        </div>
        <br/>
        <h1 class="text-sm text-neutral-500"><strong>FOUNDED BY</strong></h1>
        <div class="flex justify-between mt-10">
        <div class="w-1/2">
            <div class="founder flex flex-col items-center">
            <div class="photo mb-2">
                <a href={STAN_SOCIAL}>
                    <img class="rounded-full w-24 h-24" src={stanpfp} />
                </a>
            </div>
            <div>
                <div>
                    <a class="text-2xl hover:text-[#8840FF]" href={STAN_SOCIAL}><strong>stan</strong></a>
                </div>
            </div>
            </div>
        </div>
        <div class="w-1/2">
            <div class="founder flex flex-col items-center">
            <div class="photo mb-2">
                <a href={HITO_SOCIAL}>
                    <img class="rounded-full w-24 h-24" src={hitopfp} />
                </a>
            </div>
            <div>
                <div>
                    <a class="text-2xl hover:text-[#8840FF]" href={HITO_SOCIAL}><strong>Hito</strong></a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
}
