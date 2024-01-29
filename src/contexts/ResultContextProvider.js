import React, {createContext, useContext, useState} from "react";

const ResultContext = createContext();
const baseUrl = 'https://google-search74.p.rapidapi.com/';

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Football');

    const getResults = async (type) => {
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
            }
        });

        const data = await response.json();

        if(type.includes('/news')) {
            setResults(data.entries)
        } else if (type.includes('/images')) {
            setResults(data.image_results)
        } else {
            setResults(data.results)
        }

        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);