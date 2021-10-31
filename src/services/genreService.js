import http from "./httpService";

const apiEndPoint = "/genres";

function genreUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getGenres() {
  return http.get(apiEndPoint);
}

export function getGenre(genreId) {
  return http.get(genreUrl(genreId));
}

export function saveGenre(genre) {
  if (genre._id) {
    const body = { ...genre };
    delete body._id;
    return http.put(genreUrl(genre._id), body);
  }
  return http.post(apiEndPoint, genre);
}

export function deleteGenre(genreId) {
  return http.delete(genreUrl(genreId));
}