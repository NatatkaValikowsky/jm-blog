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
        message: "Password can't be empty"
    }
};