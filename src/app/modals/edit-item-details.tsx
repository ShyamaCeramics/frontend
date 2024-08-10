import React, { useEffect, useState } from 'react';

const EditItemDetails = ({ currentItem, isLoadingData = true }: any) => {
    const [item, setItem] = useState<any>({});

    useEffect(() => {
        setItem(currentItem);
    }, [currentItem]);

    return <>
        <div className="modal" tabIndex={-1} id="edit-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Item Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        (isLoadingData || !item) ?
                            <div style={{ display: 'flex', height: '150px', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="spinner-grow text-primary" role="status" />
                                <div className="spinner-grow text-secondary" role="status" />
                                <div className="spinner-grow text-success" role="status" />
                                <div className="spinner-grow text-danger" role="status" />
                                <div className="spinner-grow text-warning" role="status" />
                                <div className="spinner-grow text-info" role="status" />
                                <div className="spinner-grow text-dark" role="status" />
                            </div>
                            :
                            <div className="modal-body">
                                <div style={{ marginBottom: '10px', display: 'flex' }}>
                                    <div style={{ fontWeight: 'bold', width: '30%' }}>Item ID: </div>
                                    <input type="text" style={{ paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex' }}>
                                    <div style={{ fontWeight: 'bold', width: '30%' }}>Name: </div>
                                    <input type="text" style={{ paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex' }}>
                                    <div style={{ fontWeight: 'bold', width: '30%' }}>Amount: </div>
                                    <input type="text" style={{ paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                                </div>
                                <div style={{ marginBottom: '10px', display: 'flex' }}>
                                    <div style={{ fontWeight: 'bold', width: '44%' }}>Upload Image: </div>
                                    <input className="form-control" type="file" id="formFile" />
                                </div>
                            </div>
                    }
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default EditItemDetails;
