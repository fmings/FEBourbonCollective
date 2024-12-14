import { searchBourbon } from '@/api/bourbonData';
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import BourbonCard from './BourbonCard';

export default function SearchBox() {
  const [query, setQuery] = useState([]);

  const handleChange = (e) => {
    const userInput = e.target.value;
    if (userInput === '') {
      setQuery([]);
    } else {
      searchBourbon(userInput).then(setQuery);
    }
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" className="searchBox">
          Search
        </InputGroup.Text>
        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={handleChange} className="searchBox" />
      </InputGroup>
      <div>
        {query.length > 0 ? (
          <div className="search-results-container">
            <h4>Search Results</h4>
            <div className="bourbon-cards-container">
              {query.map((item) => (
                <BourbonCard key={item.id} bourbonObj={item} />
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
