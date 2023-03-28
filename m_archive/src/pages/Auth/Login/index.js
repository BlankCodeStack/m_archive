import React, { useState } from "react";
import styles from "./login.module.scss";
import { Button, Input } from "../../../components";
import { useNavigate } from "react-router-dom";
import { emailRegEx, passwordRegEx } from "../../../utils/regex";
import { validateEmail } from "./utils";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userEmail: "",
    password: "",
  });
  const { userEmail, password } = form;

  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
    console.log(e.currentTarget.value); //확인용
  };

  //NOTE: 유효성 검사
  const validatePassword = () => {
    if (password === "") {
      //입력 0
      return setPasswordStatus("입력하세요.");
    } else if (password.match(passwordRegEx) === null) {
      //성공
      return setPasswordStatus("올바른 비밀번호를 입력하세요.");
    } else {
      //땡
      return setPasswordStatus("");
    }
  };

  const onClickedRegister = () => {
    navigate("/register");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validatedEmail = validateEmail(form.userEmail);

    if (typeof validatedEmail === "string") {
      setEmailStatus(validatedEmail);
      return;
    }

    validatePassword();
    console.log(form); //확인용
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.formContainer}>
          <h1>M-archive</h1>
          <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
            <Input
              placeholder="이메일주소"
              className={styles.inputWrapper}
              name="userEmail"
              value={form.userEmail}
              onChange={onChange}
              errorText={emailStatus}
            />
            <Input
              className={styles.inputWrapper}
              // type="password"
              placeholder="비밀번호"
              name="password"
              value={form.password}
              onChange={onChange}
              errorText={passwordStatus}
            />
          </form>
          <Button width={"big"} type="submit" form="loginForm">
            로그인
          </Button>
        </div>
        <div className={styles.overlayContainer}>
          <h1>
            Hello,
            <br />
            안녕하세요?
          </h1>
          <p>
            회원가입하시고,
            <br />
            저희와 기록을 남겨요
          </p>
          <Button
            width={"big"}
            border={"borderwhite"}
            type="submit"
            form="loginForm"
            onClick={onClickedRegister}
          >
            회원가입
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
