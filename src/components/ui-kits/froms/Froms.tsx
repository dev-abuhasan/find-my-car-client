import React, { useState } from 'react';
import './froms.scss';
import {
    Button,
    Grid,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Box } from '@mui/system';
import { useFormik } from 'formik';

interface FormField {
    type: string;
    label: string;
    name: string;
    size?: 'small' | 'medium';
    margin?: 'dense' | 'normal' | 'none';
    variant?: 'outlined' | 'filled' | 'standard';
    value?: string | number;
    disabled?: boolean;
    className?: string;
    maxRows?: number;
    selectLabel?: string;
    selectValue?: string;
    inputEndIcon?: any;
    optionValues?: Array<{ [key: string]: string }>;
    handleReturnSelData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    gridSizes: { xs: number; md: number; lg: number; xl: number };
    sx?: { [key: string]: string | number };
}

interface SubmitFormProps {
    validationSchema: any;
    subBtn: {
        btnName?: string;
        btnDisable?: boolean;
        btnCn?: string;
        btnIcon?: any;
        btnColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
        btnVariant?: 'contained' | 'outlined' | 'text';
        xs?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    resetFrom?: boolean;
    handleSubmit: (values: any) => void;
    defaultValues: { [key: string]: string | number | boolean };
    formStyle?: string;
    shadow?: any;
    parentGrid?: { [key: string]: string | number };
    marginTop?: string | number;
    inputFields: Array<FormField>;
}

const Froms: React.FC<SubmitFormProps> = ({
    validationSchema,
    subBtn,
    resetFrom,
    handleSubmit,
    defaultValues,
    formStyle,
    shadow,
    parentGrid,
    marginTop,
    inputFields,
}) => {
    const [viewPass, setViewPass] = useState(true);
    const [fileName, setFileName] = useState('');
    const {
        btnName,
        btnDisable,
        btnCn,
        btnIcon,
        btnColor,
        btnVariant,
        xs,
        md,
        lg,
        xl,
    } = subBtn;

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values);
            if (resetFrom === true) {
                resetForm();
            }
        },
    });


    return (
        <form className={`${formStyle}`} onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ ...parentGrid }}>
                {inputFields.map((d: any, i: number) => (
                    <Grid item key={`${i}-${d.name}`} xs={d.gridSizes.xs} md={d.gridSizes.md} lg={d.gridSizes.lg} xl={d.gridSizes.xl}>
                        {d.type === 'checkbox' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', ...d.sx }}>
                                {d.label}&nbsp;
                                <TextField
                                    id={`${i}-${d.name}`}
                                    name={d.name}
                                    size={d.size ? d.size : 'small'}
                                    value={formik.values[d.name]}
                                    onChange={formik.handleChange}
                                    error={formik.touched[d.name] && Boolean(formik.errors[d.name])}
                                    helperText={formik.touched[d.name] && formik.errors[d.name]}
                                    className="formCheckBox"
                                    type={d.type}
                                    sx={{ border: 'none', background: 'none', width: '15px' }}
                                />
                            </Box>
                        ) : d.type === 'radio' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', ...d.sx }}>
                                {d.label}&nbsp;
                                <TextField
                                    id={`${i}-${d.name}`}
                                    name={d.name}
                                    size={d.size ? d.size : 'small'}
                                    value={formik.values[d.name]}
                                    onChange={formik.handleChange}
                                    error={formik.touched[d.name] && Boolean(formik.errors[d.name])}
                                    helperText={formik.touched[d.name] && formik.errors[d.name]}
                                    className="formCheckBox"
                                    type={d.type}
                                    sx={{ border: 'none', background: 'none', width: '15px' }}
                                />
                            </Box>
                        ) : d.type === 'select' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', ...d.sx }}>
                                <TextField
                                    disabled={d.disabled === true ? true : false}
                                    className={d.className}
                                    id={`${i}-${d.name}`}
                                    fullWidth
                                    select
                                    size={d.size ? d.size : 'small'}
                                    label={d.label}
                                    name={d.name}
                                    value={formik.values[d.name]}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        d?.handleReturnSelData && d?.handleReturnSelData(e);
                                    }}
                                    error={formik.touched[d.name] && Boolean(formik.errors[d.name])}
                                    helperText={formik.touched[d.name] && formik.errors[d.name]}
                                    sx={{ ...d.sx, marginTop: '8px' }}
                                >
                                    {d?.optionValues.map((option: any, optI: number) => (
                                        <MenuItem id={`${optI}-${d.name}-${d.value}`} key={optI} value={option[d.selectValue]}>
                                            {option[d.selectLabel]}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        ) : d.type === 'upFile' ? (
                            <TextField
                                disabled={d.disabled === true ? true : false}
                                className={`inputFileUpload CP ${d.className}`}
                                id={`${i}-${d.name}`}
                                fullWidth
                                type={'file'}
                                label={d.label}
                                name={d.name}
                                size={d.size ? d.size : 'small'}
                                rows={d.maxRows ? d.maxRows : 0}
                                multiline={d.maxRows ? true : false}
                                margin={d.margin ? d.margin : 'normal'}
                                variant={d.variant ? d.variant : 'outlined'}
                                defaultValue={formik.values[d.name]}
                                onChange={(e) => {
                                    const file = (e.target as HTMLInputElement)?.files?.[0];
                                    if (file) {
                                        formik.setFieldValue(d?.name, file);
                                        setFileName(file.name);
                                    }
                                }}
                                error={formik.touched[d.name] && Boolean(formik.errors[d.name])}
                                helperText={formik.touched[d.name] && formik.errors[d.name]}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ cursor: 'pointer', zIndex: 1, position: 'absolute' }}>
                                            <Button>
                                                <CloudUploadIcon onClick={() => setViewPass(false)} />
                                                Choose file
                                            </Button>
                                            <Typography className="fileNameTypo">{fileName}</Typography>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ ...d.sx }}
                            />
                        ) : (
                            <TextField
                                disabled={d.disabled === true ? true : false}
                                className={d.className}
                                id={`${i}-${d.name}`}
                                fullWidth
                                type={d.type === 'password' ? (viewPass ? 'password' : 'text') : d.type ? d.type : 'text'}
                                label={d.label}
                                name={d.name}
                                size={d.size ? d.size : 'small'}
                                rows={d.maxRows ? d.maxRows : 0}
                                multiline={d.maxRows ? true : false}
                                margin={d.margin ? d.margin : 'normal'}
                                variant={d.variant ? d.variant : 'outlined'}
                                value={formik.values[d.name]}
                                onChange={formik.handleChange}
                                error={formik.touched[d.name] && Boolean(formik.errors[d.name])}
                                helperText={formik.touched[d.name] && formik.errors[d.name]}
                                InputProps={
                                    d.type === 'password'
                                        ? {
                                            endAdornment: (
                                                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                    {viewPass ? (
                                                        <Button sx={{ minWidth: '10px', borderRadius: '100%', height: '40px' }}>
                                                            <VisibilityIcon onClick={() => setViewPass(false)} />
                                                        </Button>
                                                    ) : (
                                                        <Button sx={{ minWidth: '10px', borderRadius: '100%', height: '40px' }}>
                                                            <VisibilityOffIcon onClick={() => setViewPass(true)} />
                                                        </Button>
                                                    )}
                                                </InputAdornment>
                                            )
                                        } :
                                        {
                                            endAdornment: (
                                                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                    {d.inputEndIcon}
                                                </InputAdornment>
                                            )
                                        }
                                }
                                sx={{ ...d.sx }}
                            />
                        )}
                    </Grid>
                ))}
                <Grid item xs={xs} md={md} lg={lg} xl={xl} className={`${btnCn}`}>
                    <Button
                        disabled={btnDisable ? true : false}
                        type="submit"
                        fullWidth
                        className={`${btnCn} text-light text-capitalize fw-bold`}
                        variant={btnVariant ? btnVariant : 'contained'}
                        color={btnColor ? btnColor : 'primary'}
                        sx={{ boxShadow: 'none', display: 'flex', alignItems: 'center', padding: '7px 0' }}
                    >
                        {btnIcon === 'save' ? (
                            <SaveIcon />
                        ) : btnIcon === 'search' ? (
                            <SearchIcon />
                        ) : btnIcon === 'update' ? (
                            <EditIcon />
                        ) : btnIcon === 'upload' ? (
                            <CloudUploadIcon />
                        ) : btnIcon !== undefined ? (
                            <span>Invalid btnIcon: {btnIcon}</span>
                        ) : (
                            ''
                        )}
                        {btnName ? btnName : 'Submit'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Froms;