import './ListUser.css'
import { TypeUser } from '../../TypeUser'
type UserProps = {
    list: TypeUser[];
    onDelete: any;
    editProduct: (itemProduct: TypeUser) => void;
}
export const ListUser: React.FC<UserProps> = (props) => {
    return <div className="ant-list-items">

        {props.list.map((item, index) => (
            <div className="ant-list-item" key={index}>
                <div className="ant-list-item-meta" >
                    <div className="ant-list-item-meta-avatar">
                        <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                            <img src={item.image} />
                        </span>
                    </div>
                    <div className="ant-list-item-meta-content">
                        <h4 className="ant-list-item-meta-title">
                            <a>{item.name}</a>
                        </h4>
                        <div className="ant-list-item-meta-description">
                            {item.description}
                        </div>
                    </div>
                    <ul className="ant-list-item-action">
                        <li>
                            <a  onClick={() => props.editProduct(item)} >Edit</a>
                        </li>
                        <li  onClick={() => props.onDelete(item.id)}>
                            <a >Remove</a>
                        </li>
                    </ul>
                </div>
            </div>
        ))}


    </div>
}