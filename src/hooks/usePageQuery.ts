import {useSearchParams} from 'react-router-dom';

interface PageQuery {
    page: string | null;
    prevPage: () => void;
    nextPage: () => void;
}

const usePageQuery = (): PageQuery => {
    const [query, setQuery] = useSearchParams({page: '1'});

    const page = query.get('page');

    return {
        page,
        prevPage: () => setQuery(prev => {
            prev.set('page', (+prev.get('page') - 1).toString());
            return prev
        }),
        nextPage: () => setQuery(prev => {
            prev.set('page', (+prev.get('page') + 1).toString());
            return prev
        })


    }
};

export {usePageQuery};