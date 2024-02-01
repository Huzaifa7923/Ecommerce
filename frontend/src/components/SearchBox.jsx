import { useState } from "react";

import React from 'react'
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {

    const navigate=useNavigate();
    // const {keyword:urlKeyword}=useParams();

    const [keyword,setKeyword]=useState('');

    const handler=(e)=>{
        e.preventDefault();
        if(keyword){
            navigate(`/search/${keyword.trim()}`)
            setKeyword('');
        }else{
            navigate('/');
        }
    }

  return (
    <Form onSubmit={handler} className="d-flex">
        <FormControl
        type="text"
        name="q"
        onChange={(e)=>setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5">
        </FormControl>
        <Button type="submit" variant="outline-light" className="p-2 mx-2">
            Search
        </Button>
    </Form>
  )
}

export default SearchBox