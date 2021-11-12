import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TypeUser } from "../../TypeUser";


interface AddProductFormProps {
    currentProduct: TypeUser | null;
    onAddProduct: (itemProduct: TypeUser) => void;
    onEditProduct: (itemProduct: TypeUser) => void;
    onClose: () => void;
}
export const AddUserForm = ({ onAdd, currentProduct,
    onEditProduct,
    onClose, }: any) => {
    const [inputAvata, setInputAvata] = useState(currentProduct?.image || "");
    const [inputName, setInputName] = useState(currentProduct?.name || "");
    const [inputDesc, setInputDesc] = useState(currentProduct?.description || "");

    const onHandleSubmit = (e: any) => {
        if (currentProduct && onEditProduct) {
            onEditProduct({
                id: currentProduct.id,
                name: inputName,
                description: inputDesc,
                image: inputAvata,
            }); 
        } else if (onAdd) {
            onAdd({
                id: uuidv4(),
                name: inputName,
                description: inputDesc,
                image: inputAvata,
            });
        }


    }
    const onHandleChange = (e: any) => {
        setInputName(e.target.value)
    }
    const onHandleChangeDesc = (e: any) => {
        setInputDesc(e.target.value)
    }
    const onHandleChangeAvata = (e: any) => {
        setInputAvata(e.target.value)
    }
    return <div >
        <div className="field-input-group">
            <input placeholder="Avatar" type="text" className="ant-input" value={inputAvata} onChange={(e) => onHandleChangeAvata(e)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Name" type="text" className="ant-input" value={inputName} onChange={(e) => onHandleChange(e)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Content" type="text" className="ant-input" value={inputDesc} onChange={(e) => onHandleChangeDesc(e)} />
        </div>
        <div className="modal-new-user-footer">
            <button className="ant-btn ant-btn-primary" onClick={(e) => onHandleSubmit(e)}>
                Save
            </button>
            <button className="ant-btn" style={{ marginLeft: 10 }} onClick={() => onClose()}>
                Cancel
            </button>
        </div>
    </div>
}
