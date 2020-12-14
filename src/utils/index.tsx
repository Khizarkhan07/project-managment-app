export const authenticateUser = (data: any) => {
    window.localStorage.setItem("user", JSON.stringify(data));
}

export const getAuthenticatedUser = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user") as string);
    } else {
        return false;
    }
};

export const removeUser = () => {
    localStorage.removeItem("user");
}