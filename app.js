import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNR9u6fEPjxxGiMlqccdLmk70wrmJhgcQ",
  authDomain: "now-share-99191.firebaseapp.com",
  databaseURL: "https://now-share-99191-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "now-share-99191",
  storageBucket: "now-share-99191.firebasestorage.app",
  messagingSenderId: "1017784605134",
  appId: "1:1017784605134:web:2d048c4717f9e37020f39f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const roomSection = document.getElementById("roomSection");
const shareSection = document.getElementById("shareSection");

const roomInput = document.getElementById("roomInput");
const joinButton = document.getElementById("joinButton");

const pageTitle = document.getElementById("pageTitle");
const sharedUrl = document.getElementById("sharedUrl");
const openButton = document.getElementById("openButton");

function joinRoom(roomCode) {
  if (!roomCode) {
    alert("ROOMコードを入力してください");
    return;
  }

  roomSection.classList.add("hidden");
  shareSection.classList.remove("hidden");

  const roomRef = ref(database, "rooms/" + roomCode);

  onValue(roomRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      pageTitle.textContent = "まだ共有されていません";
      sharedUrl.textContent = "発表者がURLを共有すると、ここに表示されます。";
      openButton.style.display = "none";
      return;
    }

    pageTitle.textContent = data.title || "共有ページ";
    sharedUrl.textContent = data.url;

    openButton.href = data.url;
    openButton.style.display = "inline-block";
  });
}

joinButton.addEventListener("click", () => {
  const roomCode = roomInput.value.trim();
  joinRoom(roomCode);
});

const params = new URLSearchParams(window.location.search);
const roomFromUrl = params.get("room");

if (roomFromUrl) {
  roomInput.value = roomFromUrl;
  joinRoom(roomFromUrl);
}
const entryQr = document.getElementById("entryQr");

if (entryQr) {
  new QRCode(entryQr, {
    text: "https://bit.ly/KureAI-Study",
    width: 220,
    height: 220
  });
}