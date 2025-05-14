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
    const checkUser = await fetch(`${apiUrl}/login?username=${user.username}`);
    const existingUsers = await checkUser.json();

     if (existingUsers.length > 0) {
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
    console.log("تم التسجيل", data);
    alert("تم التسجيل بنجاح");
    window.location.href = "/login.html";
  } catch (error) {
    console.log("error regster", error);
  }
}
