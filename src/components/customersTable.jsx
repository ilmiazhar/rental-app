import auth from "../services/authService";
import React, { Component } from "react";
import Table from "./common/table";

class CustomersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Phone" },
    { path: "isGold", label: "isGold" }
  ];



  render() {
    const { customers, onSort, sortColumn } = this.props;
    return (
      <Table
    columns={this.columns}
        data={customers}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default CustomersTable;






















//   deleteColumn = {
//     key: "delete",
//     content: (movie) => (
//       <button
//         onClick={() => this.props.onDelete(movie)}
//         className="btn btn-danger btn-small"
//       >
//         Delete
//       </button>
//     ),
//   };

//   constructor() {
//     super();

//     const user = auth.getCurrentUser();
//     if (user && user.isAdmin) this.columns.push(this.deleteColumn);
//   }