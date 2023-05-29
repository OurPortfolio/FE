import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type LoginProps = {
  onClose: () => void;
  onSignUpClick: () => void;
};

const Login = ({ onClose, onSignUpClick }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<string>('http://3.34.102.60:8080/api/users/login', {
        email,
        password,
      });

      const accessToken = response.headers['accesstoken'];
      const refreshToken = response.headers['refreshtoken'];

      localStorage.setItem('accesstoken', accessToken);
      localStorage.setItem('refreshtoken', refreshToken);

      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const onSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSignUpClick();
  };

  return (
    <ModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <ModalContent>
        <div>
          <label htmlFor="">이메일:</label>
          <input type="text" id="email" value={email} onChange={onEmailChange} />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={onPasswordChange} />
        </div>
        <button onClick={onSubmit}>로그인</button>
        <button onClick={onSignUp}>회원가입</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Login;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;
