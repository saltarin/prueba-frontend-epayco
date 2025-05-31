import axios from 'axios';
import { Item } from '../../types/item';

type CreateItem = Pick<Item, 'title' | 'body'>;

const fetchItems = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const addItem = async (newItem: CreateItem) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newItem);
  return response.data;
};

export {
    fetchItems,
    addItem
}