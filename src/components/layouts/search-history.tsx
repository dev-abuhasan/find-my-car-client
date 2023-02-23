import * as React from 'react';
import { Divider, Button, Drawer, Box, Pagination } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetData } from '../../services/axios/https';
import * as api from '../../services/axios/api';

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
    console.log(data);

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
        if (window.confirm('Are you sure to delete Data')) {
            console.log(e);
        }
    }
    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '5px 10px' }}
            role="presentation"
        >
            <div className='d-flex justify-content-between'>
                <span>Search History</span>
                <span className='text-danger'>Delete All</span>
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

                        </div>
                    )}
                </Box>
            </Box>
            <Box sx={{ border: 1, padding: '5px 0', borderColor: 'primary.main' }}>
                <Pagination count={data?.pages} page={curr} onChange={handleChange} />
            </Box>
        </Box >
    );
    console.log(curr);

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