import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddItem } from '../../../hooks/useAddItem';
import Title from '../../atoms/Title';
import Form from '../../molecules/Form';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import Btn from '../../atoms/Btn';

interface FormData {
    title: string;
    body: string;
}

const PostForm = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const mutation = useAddItem();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate(data);
        reset();
    };

    return (
        <>
            <Title level={1}>Add New Item</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('title')} placeholder='Title'/>
                <TextArea {...register('body')} placeholder='Body'/>
                <Btn>Add Item</Btn>
            </Form>
        </>
    )
}

export default PostForm