import React, {useContext, useRef} from 'react';
import MyForm from './MyForm';
import { Context } from '../contextStore/GlobalContext';
import { setToLocalStore } from '../assets/functions';

function LeftPanel() {
   const {data, setData} = useContext(Context)
   const checkBoxRef = useRef<HTMLInputElement | null>(null);
   const mode = data.theme.isLight ? '-light' : '-black';

    function changeMode(event: React.MouseEvent) {
        event.stopPropagation();
        const newData = structuredClone(data);
        if (checkBoxRef.current?.checked) newData.theme.isLight = false;
        else newData.theme.isLight = true;
        setData(newData);
        setToLocalStore(newData);
    }

    function deleteUser() {
        if (!data.selectedUser) return null;
        const newUsers = data.users.filter(user => user.isSelected === false);
        setData({...data, users: newUsers, selectedUser: null});
        setToLocalStore({...data, users: newUsers, selectedUser: null});
    }

    return (
        <div>
            <MyForm />
            <div>
                <hr />
            </div>
            <label onClick={changeMode} className={`toggle-checkbox`} >
                <input ref={checkBoxRef} type={'checkbox'} defaultChecked={!data.theme.isLight} />
                <span className={`slider`}></span>
                <span>Mode</span>
            </label>
            <button className={`button${mode}`} onClick={deleteUser}>Delete</button>
        </div>
    );
}

export default LeftPanel;