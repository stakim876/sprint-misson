function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
  const field = input.closest(".field");
  if (!field) return;
  let error = field.querySelector(".field__error");
  if (!error) {
    error = document.createElement("p");
    error.className = "field__error";
    field.appendChild(error);
  }
  error.textContent = message || "";
  input.classList.toggle("is-invalid", Boolean(message));
}

function clearErrors(form) {
  form.querySelectorAll(".field__error").forEach((el) => {
    el.textContent = "";
  });
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
}

document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = document.getElementById(toggle.dataset.passwordToggle);
    if (!input) return;

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    toggle.src = isHidden
      ? "../icons/ic_btn_visibility_on.png"
      : "../icons/ic_btn_visibility_off.png";
    toggle.alt = isHidden ? "비밀번호 숨기기" : "비밀번호 보기";
  });
});

const form = document.querySelector(".auth__form");
const isSignup = Boolean(document.getElementById("nickname"));

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors(form);

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nicknameInput = document.getElementById("nickname");
    const confirmInput = document.getElementById("passwordConfirm");

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let valid = true;

    if (!email) {
      showFieldError(emailInput, "이메일을 입력해주세요.");
      valid = false;
    } else if (!isValidEmail(email)) {
      showFieldError(emailInput, "올바른 이메일 형식이 아닙니다.");
      valid = false;
    }

    if (!password) {
      showFieldError(passwordInput, "비밀번호를 입력해주세요.");
      valid = false;
    } else if (password.length < 8) {
      showFieldError(passwordInput, "비밀번호는 8자 이상이어야 합니다.");
      valid = false;
    }

    if (isSignup) {
      const nickname = nicknameInput.value.trim();
      const confirm = confirmInput.value;

      if (!nickname) {
        showFieldError(nicknameInput, "닉네임을 입력해주세요.");
        valid = false;
      }
      if (password !== confirm) {
        showFieldError(confirmInput, "비밀번호가 일치하지 않습니다.");
        valid = false;
      }
    }

    if (!valid) return;

    try {
      if (isSignup) {
        Store.signup({
          email,
          nickname: nicknameInput.value.trim(),
          password,
        });
      } else {
        Store.login({ email, password });
      }

      const next = qs("next");
      location.href = next || "../04_items/";
    } catch (error) {
      showFieldError(emailInput, error.message);
    }
  });
}

document.querySelectorAll(".social__buttons a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const provider = link.querySelector("img")?.alt === "kakao" ? "카카오" : "구글";
    Store.socialLogin(provider);
    const next = qs("next");
    location.href = next || "../04_items/";
  });
});