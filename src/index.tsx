import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { LocationProvider, Router } from 'preact-iso';
import { gsap } from 'gsap'
import AsyncRoute from 'preact-async-route';

import { Footer } from './components/Footer';
import { Home } from './pages/Home/index';
import { Tos } from './pages/Tos/index';
import { ReportAbuse } from './pages/ReportAbuse/index';
import { FAQ } from './pages/FAQ';
import { DeletePage } from './pages/Delete/index';
import { DownloadPage } from './pages/Download/index';
import { NotFound } from './pages/_404';

import Wordmark from './assets/cipher-files-white.png';
import './styles/style.scss';

export function App() {

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

	return (
		<LocationProvider>
			<div class="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-white py-5">
				<div class="gyat flex flex-col items-center gap-5 w-[490px] text-lg">
					<a href="/"><img id={"home"} src={Wordmark}/></a>
					<br/>
					<div id={"home"} class="flex flex-col border border-white border-[1px] p-8 rounded-lg w-full">
						<main>
							<Router>
								<AsyncRoute path="/" component={Home} />
								<AsyncRoute path="/tos" component={Tos} />
								<AsyncRoute path="/report-abuse" component={ReportAbuse} />
								<AsyncRoute path="/faq" component={FAQ} />
								<AsyncRoute path="/delete/:upload_id" component={DeletePage} />
								<AsyncRoute path="/download/:upload_id" component={DownloadPage} />
								<NotFound default />
							</Router>
						</main>
					</div>
					<Footer/>
				</div>
			</div>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app')!);
