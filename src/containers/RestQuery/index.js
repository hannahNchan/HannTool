import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Input, Select, Button} from 'semantic-ui-react';

import {apiGet} from '../../api';

import CodeArea from '../../components/CodeArea';
import { METHODS } from '../../constants';

import './styles.scss';

const RestQuery = () => {
  const [url, setUrl] = useState('');

  function handleChange(event) {
    setUrl(event.target.value);
  }

  async function handleClick() {
    const response = await apiGet(url);
    console.log(response);
  }

  return (
    <div className="rest-query">
      <div className="flex-items">
        <div className="rest-query__items">
          <div className="flex-items spaced">
            <div className="rest-query__items-vertically">
              <p>Action type</p>
            </div>
          </div>
          <div className="flex-items">
          <Input type='text' placeholder='URL' className="fullwidth" onChange={handleChange}>
            <Select compact options={METHODS} defaultValue='get' />
            <input />
            <Button disabled={url === ''} basic color='green' content='Green' onClick={handleClick}>Search</Button>
          </Input>
          </div>
        </div>
      </div>
    </div>
  )
}

RestQuery.propTypes = {}

export default RestQuery;
