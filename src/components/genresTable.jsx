import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Likes from "./common/likes";
import Table from "./common/table";

class GenresTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (genre) => (
        <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
      ),
    },
    {
      key: "like",
      content: (genre) => (
        <Likes liked={genre.liked} onClick={() => this.props.onLike(genre)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (genre) => (
      <button
        onClick={() => this.props.onDelete(genre)}
        className="btn btn-danger btn-small"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();

    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { genres, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={genres}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default GenresTable;
