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
