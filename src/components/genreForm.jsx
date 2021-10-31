import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenre, saveGenre } from "../services/genreService";

class GenreForm extends Form {
  state = {
    data: { name: ""  },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
  };

  async populateGenre() {
    try {
      const genreId = this.props.match.params.id;
      if (genreId === "new") return;

      const { data: genre } = await getGenre(genreId);
      this.setState({ data: this.mapToViewModel(genre) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenre();
  }

  mapToViewModel(genre) {
    return {
      _id: genre._id,
      name: genre.name,
    };
  }

  doSubmit = async () => {
    await saveGenre(this.state.data);

    this.props.history.push("/genres");
  };

  render() {
    return (
      <div>
        <h1>Genre Form</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default GenreForm;

