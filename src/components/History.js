import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";

function row(record, index) {
    return (
        <tr key={index}>
            <td>{record.sendToEmail[0]}</td>
            <td>{record.ccEmail[0]}</td>
            <td>{record.title}</td>
            <td>{record.body}</td>
            <td>{record.timePosted}</td>
        </tr>
    );
}

export default function History() {
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [records, setRecords] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const URL = "https://flippr-backend.herokuapp.com/api/getHistory";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: currentUser.email }),
        };
        fetch(`${URL}`, options)
            .then((res) => res.json())
            .then((res) => setRecords(res.data[0]?.histories.reverse()))
            .catch((err) => console.log(err));
    }, [currentUser]);

    async function handleLogout() {
        setError("");

        setLoading(true);
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
        setLoading(false);
    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To</th>
                        <th>CC</th>
                        <th>Subject</th>
                        <th>Body</th>
                        <th>Time Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => row(record, index))}
                </tbody>
            </Table>
            <div className="w-100 text-center mt-2">
                <Button
                    disabled={loading}
                    variant="link"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </>
    );
}
