const baseUrl = "http://localhost:3001";

export function getStaffFromApi() {
  const relUrl = "/api/staff";

  return fetch(new URL(relUrl, baseUrl)).then((response) => {
    // Check if the response returned was free of errors
    if (response.ok) {
      // Convert body data from json text to in-memory objects
      return response.json();
    }

    return Promise.reject("There was some error getting data from the service");
  });
}

// /api/music?id=5
export function getStaffByIdFromApi(staffId) {
  const fullUrl = new URL("/api/staff/id", baseUrl);
  fullUrl.searchParams.append("id", staffId);

  return fetch(fullUrl).then((response) => response.json());
}

export function postMusicToApi(title, duration, artist, genreId) {
  const relUrl = "/api/music";

  return fetch(new URL(relUrl, baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      duration: duration,
      artist: artist,
      genreId: genreId,
    }),
  }).then((response) => {
    if (response.ok) {
    } else {
      return Promise.reject(new Error("Did not save music correctly!"));
    }
  });
}

export function updateMusicToApi(musicToUpdate) {
  const { id, title, duration, artist, genreId } = musicToUpdate;

  const fullUrl = new URL("/api/music", baseUrl);

  return fetch(fullUrl, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: title,
      duration: duration,
      artist: artist,
      genreId: genreId,
    }),
  }).then((response) => {
    if (response.ok) {
    } else {
      return Promise.reject(new Error("Did not save music correctly!"));
    }
  });
}

// export async function getGenresFromApi() {
//     const fullUrl = new URL('/api/genres', baseUrl);

//     const response = await fetch(fullUrl);

//     return response.json();

//     // Old code
//     // return fetch(fullUrl).then((response) => response.json());
// }
