import { SubmitHandler, useForm } from 'react-hook-form';
import Title from '../../atoms/Title';
import Form from '../../molecules/Form';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import Btn from '../../atoms/Btn';
import { usePostsContext } from '../../../hooks/userPostContext';

interface FormData {
    title: string;
    body: string;
}

const PostForm = () => {
    const {addPost} = usePostsContext();
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        addPost(data.title, data.body)
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