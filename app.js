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

const pageTitle = document.getElementById("pageTitle");
const sharedUrl = document.getElementById("sharedUrl");
const openButton = document.getElementById("openButton");
const entryQr = document.getElementById("entryQr");

let lastOpenedUrl = "";

// 参加用QRコード表示
if (entryQr) {
  new QRCode(entryQr, {
    text: "https://bit.ly/KureAI-Study",
    width: 220,
    height: 220
  });
}

// Firebaseの共有先
const shareRef = ref(database, "now-share");

onValue(shareRef, (snapshot) => {
  const data = snapshot.val();

  if (!data || data.active === false || !data.url) {
    pageTitle.textContent = "まだ共有されていません";
    sharedUrl.textContent = "発表者がURLを共有すると、ここに表示されます。";
    openButton.style.display = "none";
    return;
  }

  pageTitle.textContent = "共有ページ";
  sharedUrl.textContent = data.url;

  openButton.href = data.url;
  openButton.style.display = "inline-block";

  // URLが変わった時だけ新しいタブで開く
  if (data.url !== lastOpenedUrl) {
    lastOpenedUrl = data.url;
    window.open(data.url, "_blank");
  }
});