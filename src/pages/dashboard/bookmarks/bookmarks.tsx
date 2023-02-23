import React from 'react';
import { DeleteData, GetData } from '../../../services/axios/https';
import * as api from '../../../services/axios/api';
import DataTable from '../../../components/ui-kits/data-table/data-table';
import { Box, Pagination } from '@mui/material';

export interface DataItem {
    bookmark?: any;
    pages?: number;
}
const Bookmarks = () => {
    const [bookmarks, setBookmarks] = React.useState<DataItem>();
    const [curr, setCurr] = React.useState(1);

    React.useEffect(() => {
        if (!bookmarks) {
            const data = async () => {
                let getData = await GetData(api.GET_BOOKMARKS, false);
                setBookmarks(getData?.items);
            }
            data();
        }
    }, [bookmarks]);
    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurr(value);

        let getData = await GetData(`${api.GET_BOOKMARKS}?pageNumber=${value}`, false);
        setBookmarks(getData?.items);
    };

    const table = [
        { title: "car", dataIndex: "car" },
        { title: "User", dataIndex: "user" },
        { title: "Delete", dataIndex: "user", type: 'delete' },
    ];
    const handleDelete = async (obj: any) => {
        await DeleteData(`${api.DEL_BOOKMARKS_BY_ID}/${obj._id}`, {}, false, false);
        setBookmarks(undefined);
    }


    return (
        <div>
            <h1>User Bookmarks</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataTable
                    rowKey="_id"
                    columns={table}
                    dataSource={bookmarks?.bookmark}
                    deleteHandler={handleDelete}
                    paginationFalse
                />
                <Box sx={{ border: 1, margin: '10px 0 0 0', padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={bookmarks?.pages} page={curr} onChange={handleChange} />
                </Box>
            </div>
        </div>
    );
};

export default Bookmarks;