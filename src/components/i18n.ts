import { useEffect, useReducer } from 'preact/hooks';

interface TranslationData {
    [key: string]: string;
}

interface State {
    language: string;
    translations: TranslationData;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: State = {
    language: 'en',
    translations: {},
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        case 'SET_TRANSLATIONS':
            return { ...state, translations: action.payload };
        default:
            return state;
    }
};

export const useTranslations = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const preferredLang = localStorage.getItem('lang');
        if (preferredLang) {
            dispatch({ type: 'SET_LANGUAGE', payload: preferredLang });
        }

        import(`../i18n/${state.language}.json`)
            .then((module) => {
                dispatch({ type: 'SET_TRANSLATIONS', payload: module.default });
            })
            .catch((error) => {
                console.error('Error loading translations:', error);
            });
    }, [state.language]);

    const translatedText = (key: string) => {
        const translation = state.translations[key] || key;

        const containsHtml = /<[^>]+>/g.test(translation);

        if (containsHtml) {
            return translation;
        }

        return translation;
    };

    return { translatedText };
};
