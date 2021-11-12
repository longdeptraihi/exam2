import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import userAPI from './api/userAPI'
import { ListUser } from './components/ListUser'
import { AddUserForm } from './components/AddUserForm'

import 'antd/dist/antd.css'
import './App.css';
import { TypeUser } from './TypeUser';


function App() {
    const [userList, setUserList] = useState<TypeUser[]>([])
    const [currentProduct, setCurrentProduct] = useState<TypeUser | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleClose = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: userList } = await userAPI.getAll();
                setUserList(userList)
            } catch (error) {
                console.error(error)
            }
        }
        getUser()
    }, []);



    const onHandleAdd = async (todo: TypeUser) => {
        try {
            const {data} =  await userAPI.add(todo)
            setUserList([
                ...userList,
                data
            ])
        } catch (error) {
            console.log(error)
        }
    }
    const onHandleDelete = async (id: string) => {
        try {
            const newTodo = window.confirm('Bạn có cần xóa không');
            if(newTodo) {
                await userAPI.remote(id);
                const newUser = userList.filter(todo => todo.id !== id);
                setUserList(newUser);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const handleEditProduct = (todo: TypeUser) => {
        setCurrentProduct(todo);
        setIsModalVisible(true);
      } 
      const handleUpdateProduct = async (itemProduct: TypeUser) => {
          const list = userList.map((item) => {
              if(item.id === itemProduct.id) {
                  return {
                      ...itemProduct
                  }
              }
              return item;
          })
          handleClose();
          try {
            await userAPI.updateProduct(itemProduct.id, itemProduct);
            setUserList(list);
          } catch (error) {
            console.log(error);
          }
    
      } 
    return (
        <div className="App">
            <h2>List user</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New User
                </button>

            </div>

            <ListUser list={userList} onDelete={onHandleDelete} editProduct={handleEditProduct} />
            <Modal title="Basic Modal" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddUserForm onEditProduct={handleUpdateProduct} currentProduct={currentProduct} onAdd={onHandleAdd} onClose={handleClose} />


            </Modal>

        </div>
    );
}

export default App;
