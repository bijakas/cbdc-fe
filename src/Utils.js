// export const getUsername = () => {
//     return localStorage.getItem("username");
// };

const getHostAdress = () => {
    const adressMap = new Map([
        ["admin", "http://localhost:8080"],
        ["indoidja", "http://localhost:8080"],
        ["bmridja", "http://localhost:8080"],
        ["cnaidja", "http://localhost:8080"],
    ]);
    return adressMap.get(localStorage.getItem("username"));
};

export {getHostAdress}