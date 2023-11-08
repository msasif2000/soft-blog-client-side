
import DataTable from 'react-data-table-component'; 
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';

const FeaturedBlogs = ({featuredBlogs}) => {
    
const data = featuredBlogs;
    return (
        <div>
            <div className="md:flex">
                <div className="p-2 gap-4 lg:w-4/6 mx-auto md:w-5/6">
                    <Table data={data}>
                        {(tableList) => (
                            <>
                                <Header>
                                    <HeaderRow>
                                        <HeaderCell>Title</HeaderCell>
                                        <HeaderCell>Author</HeaderCell>
                                        <HeaderCell>Date</HeaderCell>
                                    </HeaderRow>
                                </Header>

                                <Body>
                                    {tableList.map((item) => (
                                        <Row key={item._id} item={item}>
                                            <Cell>{item.title}</Cell>
                                            <Cell>{item.author}</Cell>
                                            <Cell>{item.date}</Cell>
                                        </Row>
                                    ))}
                                </Body>
                            </>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
