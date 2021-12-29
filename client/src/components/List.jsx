import React from "react";
import parse from "html-react-parser";
import styles from "./List.module.css";

const List = ({ contents }) => (
  <li className={styles.list}>
    <h1 className={styles.title}>{contents.title}</h1>
    <div className={styles.content}>{parse(contents.content)}</div>
  </li>
);

export default List;
