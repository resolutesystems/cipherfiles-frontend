import { useTranslations } from "../components/i18n";

export function NotFound() {
	const { translatedText } = useTranslations();

	return (
		<section>
			<h1>{translatedText('404: Not Found')}</h1>
		</section>
	);
}
