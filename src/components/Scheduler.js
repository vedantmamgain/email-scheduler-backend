import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Alert, Form, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import TextField from "@material-ui/core/TextField";

function row(record, index) {
    return (
        <tr key={index}>
            <td>{record.sendToEmail[0]}</td>
            <td>{record.ccEmail[0]}</td>
            <td>{record.title}</td>
            <td>{record.body}</td>
        </tr>
    );
}

export default function Scheduler() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [html, setHtml] = useState("");
    const [check, setCheck] = useState({
        recurring20: false,
        recurring30: false,
        week: false,
        month: false,
        year: false,
    });
    const [weekDT, setWeekDT] = useState("2021-06-28T10:30");
    const [monthDT, setMonthDT] = useState("2021-06-28T10:30");
    const [yearDT, setYearDT] = useState("2021-06-28T10:30");
    const [records, setRecords] = useState([]);

    const toRef = useRef();
    const ccRef = useRef();
    const subjectRef = useRef();

    const { currentUser, logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const URL = "https://flippr-backend.herokuapp.com/api/getEmails";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: currentUser.email }),
        };
        fetch(`${URL}`, options)
            .then((res) => res.json())
            .then((res) => setRecords(res.data[0]?.emailList.reverse()))
            .catch((err) => console.log(err));
    }, [currentUser, loading]);

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

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        if (
            !check.recurring20 &&
            !check.recurring30 &&
            !check.week &&
            !check.month &&
            !check.year
        ) {
            setError("You must select at least one scheduled format");
            return;
        }

        let scheduledEmail = {
            userEmail: currentUser.email,
            sendToEmail: [toRef.current.value],
            ccEmail: [ccRef.current.value],
            title: subjectRef.current.value,
            body: html,
            recurring: {
                schedule: check.recurring20 || check.recurring30,
                dateAndTime: check.recurring20 ? 20 : 30,
            },
            week: {
                schedule: check.week,
                dateAndTime: new Date(weekDT),
            },
            month: {
                schedule: check.month,
                dateAndTime: new Date(monthDT),
            },
            year: {
                schedule: check.year,
                dateAndTime: new Date(yearDT),
            },
            repeat: "Vedant bad man",
        };
        const URL = "https://flippr-backend.herokuapp.com/api/emails";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(scheduledEmail),
        };
        fetch(`${URL}`, options)
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }
    function handleCheckChange(e) {
        const checkbox = e.target.id;
        setCheck((prev) => {
            let curr = prev;
            if (checkbox === "scheduleRecurring20")
                curr.recurring20 = e.target.checked;
            else if (checkbox === "scheduleRecurring30")
                curr.recurring30 = e.target.checked;
            else if (checkbox === "scheduleWeekly")
                curr.week = e.target.checked;
            else if (checkbox === "scheduleMonthly")
                curr.month = e.target.checked;
            else curr.year = e.target.checked;

            return { ...curr };
        });
    }
    function handleEditorStateChange(e) {
        setHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
    }

    return (
        <>
            <Card className="w-100">
                <Card.Body>
                    <h2 className="text-center mb-4">Scheduler</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Your Email:</strong> {currentUser.email}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="to" className="mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="email" ref={toRef} required />
                        </Form.Group>
                        <Form.Group id="cc" className="mb-3">
                            <Form.Label>CC</Form.Label>
                            <Form.Control type="email" ref={ccRef} required />
                        </Form.Group>
                        <Form.Group id="subject" className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                ref={subjectRef}
                                required
                            />
                        </Form.Group>
                        <Editor
                            placeholder="Type email content here"
                            onEditorStateChange={handleEditorStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scheduleRecurring20"
                                onChange={handleCheckChange}
                                disabled={check.recurring30}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="scheduleRecurring20"
                            >
                                Recurring (every 20 seconds)
                            </label>
                        </div>
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scheduleRecurring30"
                                onChange={handleCheckChange}
                                disabled={check.recurring20}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="scheduleRecurring30"
                            >
                                Recurring (every 30 seconds)
                            </label>
                        </div>
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scheduleWeekly"
                                onChange={handleCheckChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="scheduleWeekly"
                            >
                                Weekly
                            </label>
                            {check.week && (
                                <TextField
                                    id="weekDT"
                                    type="datetime-local"
                                    defaultValue="2021-06-28T10:30"
                                    className="ms-2"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setWeekDT(e.target.value)}
                                />
                            )}
                        </div>
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scheduleMonthly"
                                onChange={handleCheckChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="scheduleMonthly"
                            >
                                Monthly
                            </label>
                            {check.month && (
                                <TextField
                                    id="monthDT"
                                    type="datetime-local"
                                    defaultValue="2021-06-28T10:30"
                                    className="ms-2"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setMonthDT(e.target.value)}
                                />
                            )}
                        </div>
                        <div className="form-check form-switch mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scheduleYearly"
                                onChange={handleCheckChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="scheduleYearly"
                            >
                                Yearly
                            </label>
                            {check.year && (
                                <TextField
                                    id="yearDT"
                                    type="datetime-local"
                                    defaultValue="2021-06-28T10:30"
                                    className="ms-2"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setYearDT(e.target.value)}
                                />
                            )}
                        </div>
                        <Button
                            disabled={loading}
                            className="w-100 mb-3 mt-3"
                            type="submit"
                        >
                            Schedule
                        </Button>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>To</th>
                                <th>CC</th>
                                <th>Subject</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => row(record, index))}
                        </tbody>
                    </Table>
                    <Link to="/history" className="btn btn-primary w-100 mt-2">
                        See History
                    </Link>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    <Button
                        disabled={loading}
                        variant="link"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </Card>
        </>
    );
}
