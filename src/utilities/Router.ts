import Cookies from "universal-cookie";

class Router {
    static homepage: string = "http://localhost:3000";
    static backend: string = "http://localhost:3001";

    static url(path: string): string {
        return Router.homepage + "/" + path;
    }

    static fetchOptions(data: {} = {}, method: string = "POST", headers: {} = { "Content-Type": "application/json", Accept: "application/json", withCredentials: true }) {
        return { method, body: JSON.stringify(Object.assign(data, { cookieid: new Cookies().get("cookieid") })), headers };
    }
}

export default Router;