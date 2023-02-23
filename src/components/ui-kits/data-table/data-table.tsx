/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Input from "antd/lib/input/Input";
import "./data-table.scss";

const DataTable = ({
    columns = [],
    dataSource = [],
    cellInputHandler,
    editHandler,
    deleteHandler,
    selectedRowsData,
    rowSelectionConfig = {
        /* Demo config values */
        // columnWidth: "150px",
        // columnTitle: "Select For Absence",
        // selectedRowKeys: [id, id ,id]
    },
    paginationFalse,
    ...args
}: any) => {
    let [headerCol, setHeaderCol] = useState([...columns]);

    useEffect(() => {
        let data = columns.map((header: any, index: number) => {
            if (header.type === "input") {
                header = {
                    ...header,
                    render: (value: any, object: any, indexOfDataArray: any) => (
                        <>
                            <Input
                                type={header.inputType ? header.inputType : "text"}
                                placeholder={header.placeholder ? header.placeholder : ""}
                                className="w-100 "
                                onChange={(event) =>
                                    cellInputHandler(
                                        event.target.value,
                                        indexOfDataArray,
                                        header.dataIndex,
                                        object
                                    )
                                }
                                value={value}
                            ></Input>
                        </>
                    ),
                };
            } else if (header.type === "select") {
                header = {
                    ...header,
                    render: (value: any, object: any, index: any) => (
                        <span>Select</span>
                    ),
                };
            } else if (header.type === "edit") {
                header = {
                    ...header,
                    render: (value: any, object: any) => (
                        <>
                            <Button onClick={() => editHandler(object)} className="table_edit_button">
                                EDIT
                            </Button>
                        </>
                    ),
                };
            } else if (header.type === "update") {
                header = {
                    ...header,
                    render: (value: any, object: any) => (
                        <>
                            {header.url ?
                                <a href={header.url} className="btn btn-outline-success" onClick={() => editHandler(object)}>{header.reName ? header.reName : 'Update'}</a>
                                :
                                <Button onClick={() => editHandler(object)}>{header.reName ? header.reName : 'Update'}</Button>
                            }
                        </>
                    ),
                };
            } else if (header.type === "delete") {
                header = {
                    ...header,
                    render: (value: any, object: any) => (
                        <>
                            <Button danger onClick={() => deleteHandler(object)} className="table_del_button">
                                DELETE
                            </Button>
                        </>
                    ),
                };
            } else if (header.type === "image") {
                header = {
                    ...header,
                    render: (value: any, object: any) => (
                        <>
                            <img
                                src={value ? value : "https://i.ibb.co/2hcLX81/user.png"}
                                height="70px"
                                width="70px"
                                alt="student"
                            />
                        </>
                    ),
                };
            } else if (header.type === "signImage") {
                header = {
                    ...header,
                    render: (value: any, object: any) => (
                        <>
                            <img
                                src={value ? value : "https://i.ibb.co/2hcLX81/user.png"}
                                width="130px"
                                alt="student"
                            />
                        </>
                    ),
                };
            }
            if (header.sortable) {
                let sorter =
                    header.sortableType && header.sortableType === "number"
                        ? (a: any, b: any) => a[header.dataIndex] - b[header.dataIndex]
                        : (a: any, b: any) => a[header.dataIndex] - b[header.dataIndex];

                header = {
                    ...header,
                    sorter,
                };
            }

            return header;
        });

        setHeaderCol(data);
    }, [columns]);

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            if (selectedRowsData) {
                selectedRowsData(selectedRowKeys, selectedRows);
            }
        },
        ...rowSelectionConfig,
        getCheckboxProps: (record: any) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div className='table_parent overflow-auto w-100'>
            <Table
                className={'table_headline'}
                rowSelection={
                    selectedRowsData
                        ? {
                            ...rowSelection,
                        }
                        : false
                }
                // className="thead"
                columns={headerCol}
                dataSource={dataSource}
                pagination={paginationFalse ? false : { position: ['bottomRight'] }}
                {...args}
            ></Table>
        </div >
    );
};

export default DataTable;