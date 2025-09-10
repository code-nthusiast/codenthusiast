// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCzuCqNWUU3aZh5CBBA9Sq7lRchkBgBt4",
  authDomain: "codenthusiast-d4e21.firebaseapp.com",
  projectId: "codenthusiast-d4e21",
  storageBucket: "codenthusiast-d4e21.appspot.com", // fixed!
  messagingSenderId: "1098736253424",
  appId: "1:1098736253424:web:0813491a1279ca7ada8535",
  measurementId: "G-C88NVCTDMV"
};

// Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// DOM elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userStatus = document.getElementById("userStatus");
const postForm = document.getElementById("postForm");
const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const fileInput = document.getElementById("fileInput");
const postsDiv = document.getElementById("posts");

let currentUser = null;

// 🔑 Auth
loginBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(err => alert(err.message));
};

logoutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    userStatus.textContent = `Signed in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    postForm.style.display = "block";
  } else {
    currentUser = null;
    userStatus.textContent = "Not signed in";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    postForm.style.display = "none";
  }
});

// 📝 Create post
postBtn.onclick = async () => {
  if (!currentUser) return alert("Sign in first!");
  const text = postInput.value;
  const file = fileInput.files[0];
  let fileUrl = null;

  if (file) {
    const ref = storage.ref("uploads/" + Date.now() + "_" + file.name);
    await ref.put(file);
    fileUrl = await ref.getDownloadURL();
  }

  await db.collection("posts").add({
    text,
    fileUrl,
    uid: currentUser.uid,
    author: currentUser.displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  postInput.value = "";
  fileInput.value = "";
};

// 📡 Listen for posts
db.collection("posts").orderBy("createdAt", "desc").onSnapshot(snapshot => {
  postsDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <strong>${post.author}</strong><br>
      <p>${post.text || ""}</p>
      ${post.fileUrl ? `<img src="${post.fileUrl}" style="max-width:100%;">` : ""}
    `;
    postsDiv.appendChild(div);
  });
});
