import { ChangeEvent, useState } from "react";
import { Input } from "../../../global/Input/Input";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../store/feature/tasks/tasksSlice";

interface SearchProps  {
  type:string
}
function KanbanSearch({type}:SearchProps) {
  let [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  }
  return (
    <>
      <Input
        type={type}
        styleType="default"
        value={inputText}
        onChange={handleInput}
      />
    </>
  );
}

export { KanbanSearch };
