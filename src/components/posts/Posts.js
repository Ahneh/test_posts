import React, { useState, useEffect } from "react";
import Description from "../description/Description";
import c from "./Posts.module.css";
import Modal from "../../core/modal/Modal";
import useModal from "../../core/modal/useModal";
import IconButton from "../../core/button/IconButton";
import { compareCounts, topThreeSame } from "./utils";
import { FormControlLabel, Switch } from "@material-ui/core";
import { CustomTextField } from "../../core/text_field/CustomTextField";

const filterOptions = {
  title: { isChecked: true, fieldName: "Title" },
  description: { isChecked: true, fieldName: "Description" },
  createAt: { isChecked: true, fieldName: "Date add" },
};

const fields = { title: "title", body: "body" };

const Posts = ({ descriptions, countSameWord, ...props }) => {
  const [post, setPost] = useState({
    id: "",
    [fields.title]: "",
    [fields.body]: "",
    createAt: "",
  });
  const [searchPostText, setSearchPostText] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [isSame, setSame] = useState(false);
  const [descriptionsPost, setDescriptionsPost] = useState(descriptions);
  const [topSamePost, setTopSamePost] = useState(descriptions);
  const [options, setOptions] = useState(filterOptions);
  const { isShowing, toggle } = useModal();

  const setClear = () => {
    setPost({ title: "", body: "" });
    setEdit(false);
  };

  useEffect(() => {
    const safeSearchText = searchPostText.toLowerCase();
    setDescriptionsPost(
      descriptions.filter((el) =>
        el.title.toLowerCase().includes(safeSearchText),
      ),
    );
  }, [descriptions, searchPostText]);

  const setDeletePost = (post) => {
    props.deletePost(post);
    setClear();
  };
  const setUpdate = (post) => {
    setEdit(true);
    setPost(post);
  };

  const addDescription = () => {
    if (post.body && post.title !== "") {
      props.addPost(post);
    }
    setClear();
    toggle();
  };
  const editPost = () => {
    props.editPost(post);
    setClear();
    setEdit(false);
    toggle();
  };
  const comparePost = (post) => {
    setSame(true);
    const currentItemPost = countSameWord.find((el) => el.idPost === post.id);
    const arrayFromCompare = countSameWord.filter(
      (el) => el.idPost !== post.id,
    );

    setTopSamePost([
      post,
      ...topThreeSame(
        descriptions,
        compareCounts(currentItemPost, arrayFromCompare),
      ),
    ]);
  };
  const onChangeSearch = (event) => {
    setSearchPostText(event.target.value);
  };

  const onChangePost = (event) => {
    setPost({ ...post, [event.target.id]: event.target.value });
  };
  const getPostItem = (item) => (
    <Description
      options={options}
      update={setUpdate}
      deleting={setDeletePost}
      compare={comparePost}
      post={item}
      key={item.id}
      toggle={toggle}
      isSame={isSame}
      setSame={setSame}
    />
  );
  const changeCheckedOptions = (event, key) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: { ...prevOptions[key], isChecked: !prevOptions[key].isChecked },
    }));
  };
  const getOption = (key, value) => (
    <div className={c.checkedOptions} key={value.fieldName}>
      <FormControlLabel
        control={
          <Switch
            id={value.fieldName}
            name={value.fieldName}
            checked={value.isChecked}
            onChange={(event) => changeCheckedOptions(event, key)}
            size='small'
            color='primary'
          />
        }
        label={value.fieldName}
      />
    </div>
  );

  return (
    <div
      className={
        !isShowing ? `${c.dialogs}` : `${c.dialogs} ${c.none_scrolling}`
      }>
      <div className={c.messageBox}>
        <div className={c.funcBlock}>
          <CustomTextField
            className={`${c.search}`}
            onChange={onChangeSearch}
            value={searchPostText}
            label='Search'
            size='small'
          />
          <div className={c.checkedBlock}>
            {Object.entries(options).map((value) => getOption(...value))}
          </div>
          <div className={c.header_button_block}>
            <IconButton icon='add' title='New Post' onClick={toggle} />
          </div>

          <Modal clearModal={setClear} isShowing={isShowing} hide={toggle}>
            <div className={c.messageInput}>
              <CustomTextField
                classNameBox={c.input_new_title}
                onChange={onChangePost}
                id={fields.title}
                value={post.title}
                label='Title'
                rowsMax={2}
              />

              <CustomTextField
                classNameBox={c.input_new_description}
                onChange={onChangePost}
                id={fields.body}
                value={post.body}
                label='Description'
                rowsMax={5}
                rows={4}
              />

              <div className={c.button_send_block}>
                <IconButton
                  title='Send'
                  onClick={isEdit ? editPost : addDescription}
                  icon='send'
                />
              </div>
            </div>
          </Modal>
        </div>

        <div className={c.messagesContent}>
          {isSame
            ? topSamePost.map(getPostItem)
            : descriptionsPost.map(getPostItem)}
        </div>
      </div>
    </div>
  );
};

export default Posts;
