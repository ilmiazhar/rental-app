import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect, textProps, valProps } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valProps]}
          style={{ cursor: "pointer" }}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProps]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProps: "name",
  valProps: "_id",
};

export default ListGroup;
