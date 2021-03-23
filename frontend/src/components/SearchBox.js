import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState('');
    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault();
                if (keyword.trim()) {
                    props.history.push(`/search/${keyword}`);
                } else {
                    props.history.push('/');
                }
            }}
            inline>
            <Form.Control
                type='text'
                value={keyword}
                onChange={(event) => {
                    setKeyword(event.target.value);
                }} placeholder='Search product'
                className='mr-sm-2 ml-sm-5'/>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
};

export default SearchBox;