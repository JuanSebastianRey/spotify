import MyFrame from './components/my-frame.js';

const apiUrl = "https://spotify23.p.rapidapi.com/search/";
const apiKey = "6275bafd33mshb8de4d750097a4fp1e70bcjsne2bdaa25c18e";
const apiHost = "spotify23.p.rapidapi.com";
const offset = Math.floor(Math.random() * 100);
const limit = Math.floor(Math.random() * 50) + 1;

const url = `${apiUrl}?q=%3CREQUIRED%3E&type=albums%2C%20artists%2C%20playlists%2C%20tracks&offset=${offset}&limit=${limit}&numberOfTopResults=5`;



const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
};

try {
  const url = "https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=albums%2C%20artists%2C%20playlists%2C%20tracks&offset=0&limit=10&numberOfTopResults=5";
  const response = await fetch(url, options);
  const result = await response.json();
  const albumItems = result.albums.items;
  return albumItems;
} catch (error) {
  console.error("Error fetching albums:", error);
  return [];
}

async function fetchAlbums() {
    try {
      const response = await fetch(`${apiUrl}?q=%3CREQUIRED%3E&type=albums%2C%20artists%2C%20playlists%2C%20tracks&offset=0&limit=10&numberOfTopResults=5`, options);
      const result = await response.json();
      if (result.albums) {
        const albumItems = result.albums.items;
        return albumItems;
      } else {
        console.error("Error fetching albums: ", result);
        return [];
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  }

async function createAlbumHTML(albumItem) {
  const getImage = albumItem.data.coverArt.sources[0].url;
  const nombre = albumItem.data.name;
  const nombreArtista = albumItem.data.artists.items[0].profile.name;
  const fecha = albumItem.data.date.year;
  const uri = albumItem.data.uri;

  const albumHTML = `
    <div class="album">
      <div class="album_order" data-id="${uri}">
        <div class="imagen_album">
          <img src="${getImage}" alt="" class="portada">
        </div>
        <div class="info_album">
          <h3>${nombre}</h3>
          <p>${nombreArtista}</p>
          <p>${fecha}</p>
        </div>
      </div>
    </div>
  `;

  return albumHTML;
}

async function renderAlbums() {
  const albumItems = await fetchAlbums();
  const listarAlbum = document.getElementById("listarAlbum");
  listarAlbum.innerHTML = "";

  albumItems.forEach((albumItem) => {
    const albumHTML = createAlbumHTML(albumItem);
    const div = document.createElement("div");
    div.innerHTML = albumHTML;
    listarAlbum.appendChild(div);

    div.querySelector(".album_order").addEventListener("click", () => {
      const frame = document.querySelector("my-frame");
      frame.setAttribute("uri", albumItem.data.uri);
    });
  });
}

renderAlbums();
