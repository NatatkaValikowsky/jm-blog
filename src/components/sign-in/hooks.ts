import { useState } from 'react';

const useHooks = () => {
    const [hasErrors,] = useState(false);
    const [isRedirect, setRedirect] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [formIsSending, setFormIsSending] = useState(false);

    return {
        hasErrors,
        isRedirect, setRedirect,
        hasError, setHasError,
        formIsSending, setFormIsSending
    }

}

export default useHooks;