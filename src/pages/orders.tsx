import WrapLayout from '@/app/components/wrap-layout';
import OrderDetails from '@/app/modals/order-details';
import { themeColor } from '@/config/configs';
import { callToFetchOrderProducts, callToFetchOrdersData } from '@/utils/apis';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const OrdersList = () => {
    const [currentOpenRowId, setCurrentOpenRowId] = useState('');
    const [currentorderData, setCurrentorderData] = useState<any>({});
    const [isLoadingData, setisLoadingData] = useState(true);
    const [isAllActive, setisAllActive] = useState(true);
    const [isPendingActive, setisPendingActive] = useState(false);
    const [isAcceptedActive, setisAcceptedActive] = useState(false);
    const [isRejectedActive, setisRejectedActive] = useState(false);
    const [ordersData, setordersData] = useState<any>([]);
    const [filteredOrdersData, setFilteredOrdersData] = useState<any>([]);
    const [isLoadingOrdersData, setisLoadingOrdersData] = useState<any>(true);
    const [userName, setUserName] = useState('');
    const [userphone, setuserphone] = useState('');
    const [useraddress, usersetaddress] = useState('');

    const fetchOrdersData = async () => {
        setisLoadingOrdersData(true);
        const apiOrdersData = await callToFetchOrdersData();
        if (apiOrdersData && apiOrdersData.data && apiOrdersData.data.length > 0) {
            setordersData(apiOrdersData.data);
            setUserName(apiOrdersData.user.name ? apiOrdersData.user.name : '');
            setuserphone(apiOrdersData.user.mobile ? apiOrdersData.user.mobile : '');
            usersetaddress(apiOrdersData.user.address ? apiOrdersData.user.address : '');
            setFilteredOrdersData(apiOrdersData.data);
        }
        setisLoadingOrdersData(false);
    };

    useEffect(() => {
        fetchOrdersData();
    }, []);

    useEffect(() => {
        setisLoadingOrdersData(true);
        const pendingOrders = ordersData && ordersData.filter((item: any) => item.status === 'created');
        const acceptedOrders = ordersData && ordersData.filter((item: any) => item.status === 'Accepted');
        const rejectedOrders = ordersData && ordersData.filter((item: any) => item.status === 'Rejected');
        if (isPendingActive) setFilteredOrdersData(pendingOrders);
        else if (isAcceptedActive) setFilteredOrdersData(acceptedOrders);
        else if (isRejectedActive) setFilteredOrdersData(rejectedOrders);
        else setFilteredOrdersData(ordersData);
        setisLoadingOrdersData(false);
    }, [isPendingActive, isAcceptedActive, isRejectedActive]);

    const fetchOrderProducts = async () => {
        setisLoadingData(true);
        const currentModalorderData = await callToFetchOrderProducts(currentOpenRowId);
        setCurrentorderData(currentModalorderData);
        setisLoadingData(false);
    };

    useEffect(() => {
        if (currentOpenRowId) {
            fetchOrderProducts();
        }
    }, [currentOpenRowId]);

    return <WrapLayout>
        <>
            <OrderDetails
                isLoadingData={isLoadingData}
                currentOrderData={currentorderData}
            />
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Orders Details</h3>
            <Card style={{ margin: '2%' }}>
                <Row style={{ justifyContent: 'center', marginTop: '15px', marginBottom: '15px' }}>
                    <Col md={6} xl={4} xxl={4}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div
                                style={{ border: '1px solid skyblue', cursor: 'pointer', color: 'skyblue', padding: '5px 10px', borderRadius: '5px' }}
                                className={isAllActive ? 'active_all_button' : ''}
                                onClick={() => {
                                    setisAllActive(true);
                                    setisPendingActive(false);
                                    setisAcceptedActive(false);
                                    setisRejectedActive(false);
                                }}
                            >
                                All
                            </div>
                            <div
                                style={{ border: '1px solid orange', cursor: 'pointer', color: 'orange', padding: '5px 10px', borderRadius: '5px' }}
                                className={isPendingActive ? 'active_pending_button' : ''}
                                onClick={() => {
                                    setisAllActive(false);
                                    setisPendingActive(!isPendingActive);
                                    setisAcceptedActive(false);
                                    setisRejectedActive(false);
                                }}
                            >
                                Pending
                            </div>
                            <div
                                style={{ border: '1px solid green', cursor: 'pointer', color: 'green', padding: '5px 10px', borderRadius: '5px' }}
                                className={isAcceptedActive ? 'active_accepted_button' : ''}
                                onClick={() => {
                                    setisAllActive(false);
                                    setisPendingActive(false);
                                    setisAcceptedActive(!isAcceptedActive);
                                    setisRejectedActive(false);
                                }}
                            >
                                Accepted
                            </div>
                            <div
                                style={{ border: '1px solid red', cursor: 'pointer', color: 'red', padding: '5px 10px', borderRadius: '5px' }}
                                className={isRejectedActive ? 'active_rejected_button' : ''}
                                onClick={() => {
                                    setisAllActive(false);
                                    setisPendingActive(false);
                                    setisAcceptedActive(false);
                                    setisRejectedActive(!isRejectedActive);
                                }}
                            >
                                Rejected
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card style={{ margin: '2%' }}>
                    {
                        isLoadingOrdersData ?
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
                            <table className="table table-hover">
                                <thead style={{ backgroundColor: themeColor }}>
                                    <tr>
                                        <th scope="col">Order Id</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Phone No.</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrdersData && filteredOrdersData.map((order: any, index: any) => {
                                        return <tr key={index}>
                                            <th scope="row" style={{ color: 'skyblue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {
                                                setCurrentOpenRowId(order.order_id);
                                            }}
                                                data-bs-toggle="modal" data-bs-target="#orders-details-modal">{order.id}</th>
                                            <td>{userName}</td>
                                            <td>{userphone}</td>
                                            <td>{useraddress}</td>
                                            <td>{order.status === 'created' ? 'Pending' : order.status}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                    }
                </Card>
            </Card>
        </>
    </WrapLayout>
}

export default OrdersList;
