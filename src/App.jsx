import "./App.css";
import { useEffect } from "react";
import { requestGet } from "./config/request";

function App() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGet();
            console.log(res);
        };
        fetchData();
    }, []);

    return <>hello</>;
}

export default App;
