import React, { useState } from "react";
import { Avatar, Button, Comment, Form } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { insertComment } from "../../../store/actions/comment";
import { fetchTaskDetail } from "../../../store/actions/task";
import TinyMCEEditor from "../../UI/Input/TinyMCEEditor";

const NewComment = ({ taskId }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);
  const [showNewCommentInput, setShowNewCommentInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskId,
      contentComment: "",
    },
  });

  const handleSubmit = () => {
    if (!formik.dirty) return;

    dispatch(
      insertComment(formik.values, () => {
        setTimeout(() => {
          formik.resetForm();
          dispatch(fetchTaskDetail(taskId));
          setShowNewCommentInput(false);
        }, 400);
      })
    );
  };

  return (
    <Comment
      avatar={<Avatar src={me.avatar} alt={me.name} />}
      content={
        <>
          {!showNewCommentInput && (
            <div
              className="p-2 border hover:border-gray-300 duration-300 rounded cursor-text"
              onClick={() => setShowNewCommentInput(true)}
            >
              Add a comment...
            </div>
          )}

          {showNewCommentInput && (
            <Form onFinish={handleSubmit}>
              <Form.Item style={{ minHeight: 200 }}>
                <TinyMCEEditor
                  name="contentComment"
                  value={formik.values.contentComment}
                  onEditorChange={(newValue) =>
                    formik.setFieldValue("contentComment", newValue)
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold hover:text-white focus:text-white border-blue-700 hover:border-blue-600 focus:border-blue-700 rounded mr-1"
                >
                  Save
                </Button>
                <Button
                  className="hover:bg-gray-200 text-gray-700 hover:text-gray-700 font-semibold border-transparent hover:border-gray-200 rounded shadow-none"
                  onClick={() => setShowNewCommentInput(false)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      }
    />
  );
};

export default NewComment;
