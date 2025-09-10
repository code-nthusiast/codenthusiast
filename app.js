// ✅ Import from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCzuCqNWUU3aZh5CBBA9Sq7lRchkBgBt4",
  authDomain: "codenthusiast-d4e21.firebaseapp.com",
  projectId: "codenthusiast-d4e21",
  storageBucket: "codenthusiast-d4e21.appspot.com",
  messagingSenderId: "1098736253424",
  appId: "1:1098736253424:web:0813491a1279ca7ada8535",
  measurementId: "G-C88NVCTDMV"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ UI references
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");
const postForm = document.getElementById("postForm");
const postText = document.getElementById("postText");
const postFile = document.getElementById("postFile");
const postsDiv = document.getElementById("posts");

function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ✅ Login with Google
loginBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// ✅ Auth state
onAuthStateChanged(auth, user => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userInfo.textContent = `Signed in as ${user.displayName}`;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    userInfo.textContent = "";
  }
});

// ✅ Posting
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return alert("You must sign in first!");

  let fileURL = "";
  if (postFile.files.length > 0) {
    const file = postFile.files[0];
    const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    text: postText.value,
    fileURL,
    author: user.displayName,
    authorId: user.uid,
    timestamp: serverTimestamp()
  });

  postText.value = "";
  postFile.value = "";
});

// ✅ Listen to posts
const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
onSnapshot(q, snapshot => {
  postsDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    postsDiv.innerHTML += `
      <div class="post">
        <strong>${post.author}</strong>
        <p>${post.text}</p>
        ${post.fileURL ? `<img src="${post.fileURL}">` : ""}
      </div>
    `;
  });
});
