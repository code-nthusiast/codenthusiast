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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);
const db = firebase.getFirestore(app);
const storage = firebase.getStorage(app);

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
  const provider = new firebase.GoogleAuthProvider();
  await firebase.signInWithPopup(auth, provider);
});

logoutBtn.addEventListener("click", async () => {
  await firebase.signOut(auth);
});

// ✅ Auth state
firebase.onAuthStateChanged(auth, user => {
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
    const storageRef = firebase.ref(storage, `posts/${Date.now()}-${file.name}`);
    await firebase.uploadBytes(storageRef, file);
    fileURL = await firebase.getDownloadURL(storageRef);
  }

  await firebase.addDoc(firebase.collection(db, "posts"), {
    text: postText.value,
    fileURL,
    author: user.displayName,
    authorId: user.uid,
    timestamp: firebase.serverTimestamp()
  });

  postText.value = "";
  postFile.value = "";
});

// ✅ Listen to posts
firebase.onSnapshot(firebase.query(firebase.collection(db, "posts"), firebase.orderBy("timestamp", "desc")), snapshot => {
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
