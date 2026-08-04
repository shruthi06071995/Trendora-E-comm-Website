import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword.trim()}`);
        } else {
            navigate("/");
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    size="sm"
                />
                <Button type="submit" variant="warning" size="sm">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchBox;