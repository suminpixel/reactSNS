import React, { useCallback , useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';
/*

네비게이션과 바디 영역을 나눠주는 메인 레이아웃
로그인 여부에 따라서 유저 프로필/로그인 폼을 뿌려줌
스토어 스테이트 : isLoggedIn

*/


const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, me} = useSelector(state => state.user);
  useEffect(()=>{
    if(!me){ //유저 정보가 있는지 체크
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
    console.log('현재 접속 유저 :' + me); //유저정보 없음
  },[]);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href="https://www.zerocho.com" ><a target="_blank">Made by ZeroCho</a></Link>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
