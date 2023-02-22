interface UserInfo {
    token: string;
}

const getToken = JSON.parse(localStorage.getItem("userInfo") ?? "null") as UserInfo | null;

export const headerConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken?.token}`,
    },
};
export const headerFromConfig = {
    headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${getToken?.token}`,
    },
};