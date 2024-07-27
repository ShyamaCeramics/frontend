import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const OrderDetails = ({ isLoadingData = true, currentOrderData }: any) => {
    const apiBaseUrl = "https://shyama-backend.onrender.com"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    const [order, setorder] = useState<any>(currentOrderData);

    useEffect(() => {
        setorder(currentOrderData);
    }, [currentOrderData]);

    function Export2Doc(element: any, filename = '') {
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        const htmlDoc: any = document.getElementById(element);
        var html = preHtml + htmlDoc.innerHTML + postHtml;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

        filename = filename ? filename + '.doc' : 'document.doc';

        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);
        const newNavigator: any = navigator;
        if (newNavigator && newNavigator.msSaveOrOpenBlob) {
            newNavigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;

            downloadLink.download = filename;

            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    }

    const ShareButton = () => {
        Export2Doc('exportContent', 'test');
    };

    return <>
        <div className="modal" tabIndex={-1} id="orders-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{order && order.name} Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {
                        isLoadingData ?
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
                            order &&
                            <>
                                <div className="modal-body" id="exportContent">
                                    {
                                        (order.length > 0) &&
                                        order.map((it: any, index: number) => {
                                            const imageUrl = it && it.images && it.images.split(',')[0];
                                            return <div key={index} className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <Image loader={() => imageUrlPath + imageUrl} src={imageUrlPath + imageUrl} width={50} height={50} alt="Snow" style={{ height: '100%', width: '75%' }} />
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Name: </span> {it.name}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Price: </span> {it.price}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Size: </span> {it.size.split('_').join(' ')}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Height: </span> {it.height}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Dia: </span> {it.dia}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Quantity: </span> {it.quantity}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Category: </span> {it.category.split('_').join(' ')}
                                                            </h5>
                                                            <h5 className="card-title">
                                                                <span style={{ fontWeight: 'bold' }}>Description: </span> {it.description}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                    }
                    <div className="modal-footer">
                        <button type="button" onClick={ShareButton} className="btn btn-warning" data-bs-dismiss="modal">Download</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrderDetails;
