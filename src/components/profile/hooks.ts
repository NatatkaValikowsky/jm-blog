import {useState, useEffect} from 'react';

const useHooks = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [formIsSending, setFormIsSending] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return {
        username, setUsername,
        email, setEmail,
        formIsSending, setFormIsSending,
        isLoading
    };
}

export default useHooks;