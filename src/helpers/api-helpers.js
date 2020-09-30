export function fetchArtistProfile(token, artistId) {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = `http://api.spotify.com/v1/artists/${artistId}`;

  return fetch(url, options).then((response) => response.json()).catch((err) => console.log(err));
}

export function roundNumbers(num) {
  if (num < 1000) {
    return num;
  } else if (num >= 1000 && num < 1000000) {
    return Math.round(num / 1000) + "K";
  } else if (num >= 1000000) {
    return Math.round(num / 1000000) + "M";
  }
  // we'll assume no one has more than a billion followers.
  // I don't think even Spofity has a billion users.
}