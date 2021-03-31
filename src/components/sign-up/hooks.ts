import {useState} from 'react';
import {IServerErrors} from "./types";

const useHooks = () => {

    const [isRedirect, setRedirect] = useState(false);
    const [formIsSending, setFormIsSending] = useState(false);
    const [serverErrors, setServerErrors] = useState<IServerErrors>({
        email: null,
        username: null
    });

    return {
        isRedirect, setRedirect,
        formIsSending, setFormIsSending,
        serverErrors, setServerErrors,
    }
}

export default useHooks;