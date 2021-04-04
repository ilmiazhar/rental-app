import ListGroup from "./common/listgroup";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    // const { data } = await getGenres();
    // const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  // handleGenreSelect = (genre) => {
  //   this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  // };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers,
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allCustomers.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0)
      return (
        <p>
          <strong>Tidak ada pelanggan di dalam basis data.</strong>
        </p>
      );

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className="row">
        {/* <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div> */}
        <div className="col">
          {/* {user && (
            <Link
              className="btn btn-primary"
              to="/customers/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )} */}

          <p>
            <strong>
              Menampilkan {totalCount} pelanggan di dalam basis data.
            </strong>
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
            sortColumn={sortColumn}
            // onLike={this.handl eLikes}
            // onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Customers;

// handleDelete = async (movie) => {
//   const originalcustomers = this.state.customers;
//   const customers = originalcustomers.filter((m) => m._id !== movie._id);

//   this.setState({ customers });

//   try {
//     await deleteMovie(movie._id);
//     toast.success("Movie deleted successfully.");
//   } catch (ex) {
//     if (ex.response && ex.response.status === 404)
//       toast.error("This movie has already been deleted.");
//     else if (ex.response && ex.response.status === 403)
//       toast.error("Only admin can delete this movie.");

//     this.setState({ customers: originalcustomers });
//   }
// };

// handleLikes = (movie) => {
//   const customers = [...this.state.customers];
//   const index = customers.indexOf(movie);
//   customers[index] = { ...customers[index] };
//   customers[index].liked = !customers[index].liked;

//   this.setState({ customers });
//   toast("Movie successfully liked");
// };
