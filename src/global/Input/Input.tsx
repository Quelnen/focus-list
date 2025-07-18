import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  styleType: string;
  value:string,
  onChange : (event: ChangeEvent<HTMLInputElement>)=>void
}

function Input({ type ,styleType,value,onChange}: InputProps) {
  return (
    <>
      <input type={type} className={styles[`input-${styleType}`]} value={value} onChange= {onChange}/>
    </>
  );
}

export { Input };
