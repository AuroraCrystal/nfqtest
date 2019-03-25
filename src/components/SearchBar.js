import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = (props) => {
    const { searchMedia } = props;
    return (
      <div>
        <Form>
         <Form.Control type="text" placeholder="Type in your keyword..." onChange={searchMedia} style={{width : "100%"}}/>
        </Form>
      </div>
    )
}

export default SearchBar;