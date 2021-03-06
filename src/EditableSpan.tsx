import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}



export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }


    return editMode
        ? <TextField
            variant="filled"
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus onBlur={activateViewMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

}