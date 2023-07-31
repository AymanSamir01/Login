let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let notValid = document.getElementById("notValid");
let btnSignUp = document.getElementById("btnSignUp");
let emailSignIn = document.getElementById("emailSignIn");
let passSignIn = document.getElementById("passSignIn");
let btnSignIn = document.getElementById("btnSignIn");
let signInValidation = document.getElementById("signInValidation");
let contentHome = document.getElementById("contentHome");
let gotoHome = document.getElementById("gotoHome");
let gotoLogin = document.getElementById("gotoLogin");
if (notValid != null) {
  notValid.classList.add("d-none");
}
let register = [];
if (localStorage.getItem("register") != null) {
  register = JSON.parse(localStorage.getItem("register"));
}
if (btnSignUp != null) {
  btnSignUp.addEventListener("click", getSignUpValues);
}
function getSignUpValues() {
  if (validateUserName() && validateUserEmail() && validateUserPassword()) {
    var obj = {
      name: userName.value,
      email: userEmail.value,
      pass: userPassword.value,
    };
    var checkEmail = userEmail.value;
    function check() {
      for (let i = 0; i < register.length; i++) {
        if (register[i].email == checkEmail) {
          return true;
        }
      }
    }
    if (check() == true) {
      notValid.innerHTML = "email already exists";
      notValid.classList.replace("d-none", "d-block");
      notValid.classList.replace("text-success", "text-danger");
      clear();
    } else {
      register.push(obj);
      localStorage.setItem("register", JSON.stringify(register));
      notValid.innerHTML = "success";
      notValid.classList.replace("d-none", "d-block");
      notValid.classList.replace("text-danger", "text-success");
      clear();
      gotoLogin.href = "login.html";
    }
  }
  if (register.length == 0) {
    register.push(obj);
    localStorage.setItem("register", JSON.stringify(register));
    notValid.innerHTML = "success";
    notValid.classList.replace("d-none", "d-block");
    notValid.classList.replace("text-danger", "text-success");
    gotoLogin.href = "login.html";
  } else if (
    userName.value == "" ||
    userEmail.value == "" ||
    userPassword.value == ""
  ) {
    notValid.classList.replace("d-none", "d-block");
  } else if (validateUserName() == false) {
    notValid.innerHTML = "name is not valid";
    notValid.classList.replace("d-none", "d-block");
    notValid.classList.replace("text-success", "text-danger");
  } else if (validateUserEmail() == false) {
    notValid.innerHTML = "email is not valid";
    notValid.classList.replace("d-none", "d-block");
    notValid.classList.replace("text-success", "text-danger");
  } else if (validateUserPassword() == false) {
    notValid.innerHTML = "password is not valid";
    notValid.classList.replace("d-none", "d-block");
    notValid.classList.replace("text-success", "text-danger");
  }
}
// clear
function clear() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
// validation registration
function validateUserName() {
  let regex = /^[A-za-z]{1,}$/;
  return regex.test(userName.value);
}
function validateUserEmail() {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(userEmail.value);
}
function validateUserPassword() {
  let regex = /^[a-zA-Z0-9]{3,}/;
  return regex.test(userPassword.value);
}
// log in after register
if (btnSignIn != null) {
  signInValidation.classList.add("d-none");
  btnSignIn.addEventListener("click", getSignInValues);
}
function checkFound() {
  var em = emailSignIn.value;
  var pas = passSignIn.value;
  var x = 0;
  for (let i = 0; i < register.length; i++) {
    if (register[i].email == em && register[i].pass == pas) {
      x += i;
      localStorage.setItem("x", JSON.stringify(x));
      return true;
    }
  }
}
function getSignInValues() {
  if (emailSignIn.value == "" && passSignIn.value == "") {
    signInValidation.innerHTML = "All inputs are required";
    signInValidation.classList.replace("d-none", "d-block");
  } else if (checkFound() == true) {
    gotoHome.href = "home.html";
    clear();
  } else {
    signInValidation.classList.replace("d-none", "d-block");
  }
}
// go to home page
if (contentHome != null) {
  var index = Number(localStorage.getItem("x"));
  let content = `<h2>Welcome ${register[index].name}</h2>`;
  contentHome.innerHTML = content;
}
