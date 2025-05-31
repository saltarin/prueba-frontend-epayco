import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './index.css';

const fetchItems = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const addItem = async (newItem) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newItem);
  return response.data;
};

const useItems = () => {
  return useQuery('items', fetchItems, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};

const Item = ({ item }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 border border-gray-500">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
      <p className="text-gray-600">{item.body}</p>
    </div>
  );
};

const ItemList = ({ items }) => {
  return (
    <div className="mt-4 bg-gray-400 p-4 max-h-48 lg:max-h-[500px] overflow-y-auto rounded">
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

const Home = () => {
  const { data: items, error, isLoading } = useItems();
  const { register, handleSubmit, reset } = useForm();
  const mutation = useAddItem();

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
  };

  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading items.</div>;

  return (
    <PageLayout>
      <div className="bg-transparent py-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Add New Item</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-lg mx-auto flex flex-col gap-4 bg-white p-6 rounded shadow mb-8 border border-gray-100">
          <input {...register('title')} placeholder="Title" required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
          <textarea {...register('body')} placeholder="Body" required className="w-full min-h-20 resize-none border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 hover:cursor-pointer transition-colors">
            Add Item
          </button>
        </form>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Items List</h2>
          <ItemList items={items} />
        </div>
      </div>
    </PageLayout>
  );
};

const PageLayout = ({ children }) => {
  return (
    <div className="bg-green-100 w-full min-h-screen">
      <main className="container mx-auto px-4 lg:px-0">
        {children}
      </main>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
