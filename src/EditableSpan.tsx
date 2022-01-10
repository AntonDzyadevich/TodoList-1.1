import React, {ChangeEvent, useState} from "react";


type EditableSpanPropsType = {
    value: string
}



export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {setEditMode(false)}

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }




    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

}