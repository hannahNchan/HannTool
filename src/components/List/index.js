import React, { useEffect, useState } from "react";
import treeify from 'object-treeify';
import PropTypes from "prop-types";
import { List, Checkbox } from "semantic-ui-react";

import "./styles.scss";

const NestedList = ({ items }) => {
  const [elements, setElements] = useState([]);
  const [listType, setListType] = useState([]);
  const [treified, setTreified] = useState();

  useEffect(() => {
    let tempArray = [];
    for (const item in items) {
      tempArray.push({
        name: item,
        type:
          typeof items[item] === "object" && Array.isArray(items[item])
            ? "array"
            : typeof items[item],
        value: items[item],
      });
    }
    setElements([...tempArray]);
    setListType(Array(Object.keys(items).length).fill(false));
    setTreified(treeify(items),{});
  }, [items]);

  function handleClickCheck(index, { checked }) {
    let tempArray = [...listType];
    tempArray[index] = checked;
    setListType([...tempArray]);
  }

  return (
    <p>{treified}</p>
    // <List className="nested-list">
    //   {elements.length !== 0 &&
    //     elements.map(({ name, type, value }, index) => {
    //       return (
    //         <List.Item key={`item-${index}`}>
    //           <Checkbox onChange={(e, data) => handleClickCheck(index, data)} />
    //           <span className="nested-list__item">{name}</span>
    //           {listType[index] ? (
    //             <span className="nested-list__itemType">{type}</span>
    //           ) : (
    //             ""
    //           )}
    //         </List.Item>
    //       );
    //     })}
    // </List>
  );
};

NestedList.defaultProps = {
  items: [],
};

NestedList.propTypes = {
  items: PropTypes.array,
};

export default NestedList;
