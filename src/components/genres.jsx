import ListGroup from "./common/listgroup";
import GenresTable from "./genresTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import React, { Component } from "react";
import { deleteGenre, getgenres } from "../services/genreService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";

class genres extends Component {
state = {
    genres: [],
    currentPage: 1,
    pageSize: 5,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [ ...data];

    // const { data: genres } = await getgenres();
    this.setState({ genres, genres });
  }

  handleDelete = async (genre) => {
    const originalGenres = this.state.genres;
    const genres = originalGenres.filter((m) => m._id !== genre._id);

    this.setState({ genres });

    try {
      await deleteGenre(genre._id);
      toast.success("Movie deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      else if (ex.response && ex.response.status === 403)
        toast.error("Only admin can delete this movie.");

      this.setState({ movies: originalGenres });
    }
  };

  handleLikes = (genre) => {
    const genres = [...this.state.genres];
    const index = genres.indexOf(genre);
    genres[index] = { ...genres[index] };
    genres[index].liked = !genres[index].liked;

    this.setState({ genres });
    toast("Genre successfully liked");
  };


  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      genres: allGenres,
    } = this.state;

    let filtered = allGenres;
    if (searchQuery)
      filtered = allGenres.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allGenres.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const genres = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: genres };
  };

  render() {
    const { length: count } = this.state.genres;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: genres } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              className="btn btn-primary"
              to="/genres/new"
              style={{ marginBottom: 20 }}
            >
              New Genre
            </Link>
          )}

          <p>
            <strong>Menampilkan {totalCount} genre di dalam basis data.</strong>
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <GenresTable
            genres={genres}
            sortColumn={sortColumn}
            onLike={this.handleLikes}
            onDelete={this.handleDelete}
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

export default genres;
