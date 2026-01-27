import { useState, useEffect } from "react";
import Context from "./Context";
import { requestAuth } from "../config/UserRequest";
import cookie from "js-cookie";

export function Provider({ children }) {
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = cookie.get("logged");

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const res = await requestAuth();
                setDataUser(res.metadata);
            } catch (error) {
                console.error("Auth error:", error);
                setDataUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchAuth();
        } else {
            setDataUser(null);
            setLoading(false);
        }
    }, [token]);

    return (
        <Context.Provider value={{ dataUser, setDataUser, loading }}>
            {children}
        </Context.Provider>
    );
}
