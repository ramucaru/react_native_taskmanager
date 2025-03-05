
export const emailRegux = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const passwordRegux = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-]).{8,}$/;
export const validateEmail = (email: string): string => {
    if (!email) return "Email is required"
    else if (!emailRegux.test(email)) return "email is invalid"
    return "";
};

export const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    else if (!passwordRegux.test(password)) return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
    return "";
};
