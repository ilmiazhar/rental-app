import React, { Component } from "react";

// Column = Array
// sortColumn = Object
// onSort = Function
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  handleSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (column.path) {
      if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
      return <i className="fa fa-sort-desc"></i>;
    }
  };

  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => (column.path ? this.raiseSort(column.path) : "")}
              className={column.path ? "clickable" : ""}
            >
              {column.label} {this.handleSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
