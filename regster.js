const apiUrl = "https://6823d7c965ba058033980ad3.mockapi.io";
let username = document.getElementById("username-input");
let password = document.getElementById("password-input");
let confirmPassword = document.getElementById("confirm-password");
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (confirmPassword.value != password.value) {
    alert("كلمة السر غير متطابقه");
    return;
  }

  const user = { username: username.value, password: password.value };
  createUser(user);
});


async function createUser(user) {
  try {
    const checkUser = await fetch(`${apiUrl}/login`);
    const allUsers = await checkUser.json();
    const existingUser = allUsers.find(u => u.username === user.username);
    
    if (existingUser) {
      alert("اسم المستخدم موجود");
      return;
    }
    
  
    // post create user
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    console.log("تم التسجيل", data);
    alert("تم التسجيل بنجاح");
    window.location.href = "/login.html";

  } catch (error) {
    console.log("error register", error);
  }
}
