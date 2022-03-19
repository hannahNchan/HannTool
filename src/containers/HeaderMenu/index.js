import React, {useEffect, useState} from "react";

import './styles.scss';

const HeaderMenu = ({handleChangeGrid, handleChangeVisual}) => {
  return (
    <div className="header-menu">
      <h2>Use this area below to drag content</h2>
      <div className="header-menu__selector">
        <span>Select Canvas or HTML version</span>
        <label className="header-menu__custom-select" htmlFor="styledSelect1">
          <select id="styledSelect2" name="options" onChange={handleChangeVisual}>
            <option value="html">HTML 5</option>
            <option value="canvas">Canvas</option>
          </select>
        </label>
      </div>
      <div className="header-menu__selector">
        <span>Select Density Area</span>
        <label className="header-menu__custom-select" htmlFor="styledSelect1">
          <select id="styledSelect1" name="options" onChange={handleChangeGrid}>
            <option value="10">Low resolution</option>
            <option value="15">Normal Grid</option>
            <option value="20">Grained</option>
            <option value="30">Medium resolution</option>
            <option value="35">Dense</option>
            <option value="50">Ultra dense</option>
            <option value="100">High resolution</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default HeaderMenu;
