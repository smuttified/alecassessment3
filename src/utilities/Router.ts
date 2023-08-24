import Cookies from "universal-cookie";

class Router {
    static homepage: string = "https://alecassessment3.onrender.com";
    static backend: string = "https://alecassessment3backend.onrender.com";
    static navigate: any = false;

    static url(path: string): string {
        return "/" + path;
    }

    static fetchOptions(data: {} = {}, method: string = "POST", headers: {} = { "Content-Type": "application/json", Accept: "application/json", withCredentials: true }) {
        return { method, body: JSON.stringify(Object.assign(data, { cookieid: new Cookies().get("cookieid") })), headers };
    }
}

export default Router;