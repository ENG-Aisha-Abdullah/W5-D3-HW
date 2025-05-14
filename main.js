const apiUrl = "https://6823d7c965ba058033980ad3.mockapi.io";
const imageUrl = document.getElementById("imageUrl");
const postText = document.getElementById("postText");
const button = document.getElementById("submit");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("المستخدم من localStorage:", localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("يجب تسجيل الدخول أولاً");
    return;
  }
  // post create post
  const response = await fetch(`${apiUrl}/images`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      imageUrl: imageUrl.value,
      text: postText.value,
      comment: [],
      userId: user.id,
      username: user.username,
    }),
  });

  // const data = await response.json();
  // console.log("تم نشر", data);
  // alert("تم النشر");
  getPosts();
});

async function getPosts() {
  const res = await fetch(`${apiUrl}/images`);
  const posts = await res.json();
  dsipalyPosts(posts);
}
function dsipalyPosts(posts) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const container = document.getElementById("posts-container");
  container.innerHTML = "";
  // const commentsDiv = document.createElement("div");
  // const comeentUl = document.createElement("ul");

  posts.forEach((item) => {
    const userInfo = document.createElement("p");
    userInfo.innerText = item.username;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.imageUrl;
    // img.style.width = "10rem";
    // img.style.height = "15rem";

    const title = document.createElement("h4");
    title.innerText = item.text;
    // ==
    const commentsUl = document.createElement("ul");
    item.comment.forEach((list) => {
      const li = document.createElement("li");
      li.innerText = `💬 ${list.username}: ${list.text}`;
      commentsUl.appendChild(li);
    });

    // ==
    // const commentLi = document.createElement("li");
    card.appendChild(userInfo);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(commentsUl);
    // comeentUl.appendChild(commentLi);
    // card.appendChild(comeentUl);
    container.appendChild(card);
    card.className = "d-flex flex-column justify-content-center align-items-center rounded p-3 bg-light border-light shadow w-25 ";
    container.className = "d-flex justify-content-center align-items-center rounded p-3 bg-light gap-3 pb-5 flex-wrap";
    img.classList= "pb-2 card-img-top rounded "
    userInfo.classList = "fs-5"

    if (currentUser && currentUser.id === item.userId) {
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", async () => {
        if (confirm("هل تريد حذف هذا المنشور؟")) {
          await fetch(`${apiUrl}/images/${item.id}`, {
            method: "DELETE",
          });
          getPosts();
        }
      });
      card.appendChild(deleteBtn);
      deleteBtn.className = "btn btn-danger btn-sm w-100";
    }

  });
}

getPosts();
