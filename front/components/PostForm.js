import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
/*

포스팅(업로드) 포맷
스토어 스테이트 : imagePath <-?
자체 스테이트 : 0

*/
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

  //기존에 입력된 게시글 지우는 함수
  useEffect(() => {
    setText('');
  }, [postAdded === true]); //postAdded 라는 스테이트가 true 가 된 순간 칸이 비워 //success에서 false 가 ㄷehlsek.

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('포스팅 버튼 클릭 :' + text); //유저정보 없음
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text.trim(),
      },
    });
  }, [text]);

  //유저가 인풋창에 입력한 텍스트 변화할 때
  const onChangeText = useCallback((e) => {
    console.log('포스팅 입력 :' + e.target.value); //유저정보 없음
    setText(e.target.value);
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>{/* 인코딩 타입 : 파일, 이미지 업로드  */}
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
      </div>

      {/* 미리보기 이미지 매핑 */}
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
