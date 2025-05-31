import { useItems } from "../../../hooks/useItems";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import PageLayout from "../../layout/DefaultLayout";
import ItemList from "../../organisms/ItemList";
import PostForm from "../../organisms/PostForm";

const Home = () => {
    const { error, isLoading } = useItems();

    if (isLoading) return <Loader>Loading...</Loader>;
    if (error) return <ErrorMessage mode="fullScreen">Error loading items.</ErrorMessage>;

    return (
        <PageLayout>
            <PostForm />
            <ItemList />
        </PageLayout>
    )
}

export default Home