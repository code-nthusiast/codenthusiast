// ✅ Firebase config
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

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
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
});

logoutBtn.addEventListener("click", async () => {
  await auth.signOut();
});

// ✅ Auth state
auth.onAuthStateChanged(user => {
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
    const storageRef = storage.ref(`posts/${Date.now()}-${file.name}`);
    await storageRef.put(file);
    fileURL = await storageRef.getDownloadURL();
  }

  await db.collection("posts").add({
    text: postText.value,
    fileURL,
    author: user.displayName,
    authorId: user.uid,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    likes: [],
  });

  postText.value = "";
  postFile.value = "";
});

// ✅ Render posts
db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  postsDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    const postId = doc.id;
    const user = auth.currentUser;
    const liked = user && post.likes.includes(user.uid);

    let html = `
      <div class="post">
        <strong>${post.author}</strong>
        <p>${post.text}</p>
        ${post.fileURL ? `<img src="${post.fileURL}">` : ""}
        <div class="actions">
          <button onclick="toggleLike('${postId}')">${liked ? "💔 Unlike" : "❤️ Like"}</button>
          <span>${post.likes.length} likes</span>
          ${user && user.uid === post.authorId ? `<button onclick="deletePost('${postId}')">🗑️ Delete</button>` : ""}
        </div>
        <div class="comments" id="comments-${postId}"></div>
        <form onsubmit="addComment(event, '${postId}')">
          <input type="text" placeholder="Add a comment..." required>
          <button type="submit">Post</button>
        </form>
      </div>
    `;
    postsDiv.innerHTML += html;

    // Load comments
    loadComments(postId);
  });
});

// ✅ Like toggle
async function toggleLike(postId) {
  const user = auth.currentUser;
  if (!user) return alert("Sign in first!");

  const postRef = db.collection("posts").doc(postId);
  const postDoc = await postRef.get();
  let likes = postDoc.data().likes || [];

  if (likes.includes(user.uid)) {
    likes = likes.filter(id => id !== user.uid);
  } else {
    likes.push(user.uid);
  }

  await postRef.update({ likes });
}

// ✅ Delete post
async function deletePost(postId) {
  if (!confirm("Delete this post?")) return;
  await db.collection("posts").doc(postId).delete();
}

// ✅ Comments
async function addComment(e, postId) {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return alert("Sign in first!");
  const text = e.target.querySelector("input").value;
  await db.collection("posts").doc(postId).collection("comments").add({
    text,
    author: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  e.target.reset();
}

function loadComments(postId) {
  const commentsDiv = document.getElementById(`comments-${postId}`);
  db.collection("posts").doc(postId).collection("comments").orderBy("timestamp")
    .onSnapshot(snapshot => {
      commentsDiv.innerHTML = "";
      snapshot.forEach(doc => {
        const c = doc.data();
        commentsDiv.innerHTML += `<div class="comment"><strong>${c.author}:</strong> ${c.text}</div>`;
      });
    });
}
