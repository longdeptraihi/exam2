import { TypeUser } from '../TypeUser';
import { axiosClient } from './axiosClient';


const TodoAPI = {
    getAll() {
        const url = `/users`;
        return axiosClient.get(url);
    },
    get(id: any) {
        const url = `/users${id}`;
        return axiosClient.get(url);
    },
    add(todo: TypeUser) {
        const url = `/users`;
        return axiosClient.post(url, todo);
    },
    remote(id: string) {
        const url = `/users/${id}`;
        return axiosClient.delete(url)
    },
    updateProduct(id: string, itemProduct: TypeUser) {
        const url = `/users/${id}`;
        axiosClient.put(url, itemProduct)
    },
}
export default TodoAPI;