import React from 'react';
import PropTypes from 'prop-types';
import Hierarchy from './hierarchy';

const Sidebar = () => (
  <div className='sidebar'>
    <div className='disp'>
      <Hierarchy/>
    </div>
    <div className='buttons'></div>
  </div>
)

export { Sidebar }
