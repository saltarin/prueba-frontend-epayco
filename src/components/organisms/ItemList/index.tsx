import { useItems } from '../../../hooks/useItems';
import Item from '../../atoms/Item';
import Title from '../../atoms/Title';
import List from '../../molecules/ItemList';

const ItemList = () => {
    const { data: items } = useItems();
    return (
        <>
            <Title level={2}>Items List</Title>
            <List items={items} renderComponent={(item) => (<Item {...item} />)} />
        </>
    )
}

export default ItemList