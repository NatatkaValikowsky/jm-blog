import {useState} from 'react';
import {initialTags} from "./initial";

const useHooks = () => {

    const [isRedirect, setIsRedirect] = useState(false);
    const [formIsSending, setFormIsSending] = useState(false);
    const [tags, setTags] = useState(initialTags);

    return {
        isRedirect, setIsRedirect,
        formIsSending, setFormIsSending,
        tags, setTags
    }
}

export default useHooks;