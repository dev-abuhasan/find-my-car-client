import * as React from 'react';
import { Divider, Button, Drawer, Box, Pagination } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';
import { DeleteData, GetData } from '../../services/axios/https';
import * as api from '../../services/axios/api';
import { toast } from 'react-hot-toast';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface DataItem {
    pages?: number;
    page?: number;
    count?: number;
    search?: any;
}

const SearchHistory: React.FC = () => {
    const [state, setState] = React.useState({ right: false });
    const [data, setData] = React.useState<DataItem>({});

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const [curr, setCurr] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setState({ right: true });
        setCurr(value);
    };

    const deleteSearchByID = async (e: string) => {
        let deleteById = await DeleteData(`${api.GET_SEARCH_HISTORY}/${e}`, {}, false, true);
        if (deleteById) {
            let getData = await GetData(`${api.GET_SEARCH_HISTORY}?pageNumber=${curr}`, false);
            setData(getData?.items)
        }
    }
    const deleteSearchAll = async () => {
        if (data?.count && data?.count > 0) {
            let delData = await DeleteData(`${api.GET_SEARCH_HISTORY}/delete`, {}, false, true);
            if (delData) {
                let getData = await GetData(`${api.GET_SEARCH_HISTORY}?pageNumber=${curr}`, false);
                setData(getData?.items)
            }
        } else{
            toast.error('Search history not found')
        }

    }
    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '5px 10px' }}
            role="presentation"
        >
            <div className='d-flex justify-content-between'>
                <span>Search History</span>
                <span className='text-danger' style={{ cursor: 'pointer' }} onClick={() => deleteSearchAll()}>
                    Delete All
                </span>
            </div>
            <Divider />
            <Box sx={{ height: '85vh', overflow: 'auto' }}>

                <Box>
                    {data?.search?.map((d: any, i: number) =>
                        <div key={i} className="border mb-2 p-1">
                            <div className='d-flex justify-content-between align-items-center'>
                                {new Date(d?.createdAt).toLocaleString()}
                                <CancelIcon className='text-danger' onClick={() => deleteSearchByID(d._id)} />
                            </div>
                            <div className='pt-2'>
                                {d?.data?.keyword ? d?.data?.keyword : d?.params}
                            </div>
                        </div>
                    )}
                </Box>
            </Box>
            <Box sx={{ border: 1, padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                <Pagination count={data?.pages} page={curr} onChange={handleChange} />
            </Box>
        </Box >
    );

    React.useEffect(() => {
        if (state.right) {
            const data = async () => {
                let getData = await GetData(`${api.GET_SEARCH_HISTORY}?pageNumber=${curr}`, false);
                setData(getData?.items)
            }
            data();
        }

    }, [curr, state.right]);

    return (
        <div>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} title={'Search history'}>
                        <SettingsIcon />
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default SearchHistory;