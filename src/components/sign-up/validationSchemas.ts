export const usernameValidation = { required: {
        value: true,
        message: "Username is required"
    },
    maxLength : {
        value: 20,
        message: 'Your username needs to be maximum 20 characters.'
    },
    minLength: {
        value: 3,
        message: 'Your username needs to be at least 3 characters.'
    }
};

export const emailValidation = {
    required: {
        value: true,
        message: "Email is required"
    },
    pattern: {
        value: /.+@.+\..+/i,
        message: "Invalid Email address"
    }
};

export const passwordValidation = {
    required: {
        value: true,
        message: "Password is required"
    },
    minLength: {
        value: 8,
        message: "Your password needs to be at least 8 characters."
    },
    maxLength: {
        value: 40,
        message: "Your password needs to be maximum 40 characters."
    }
};

export const agreementValidation = {
    required: {
        value: true,
        message: "Must be checked."
    }
};