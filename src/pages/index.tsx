import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import WrapLayout from '@/app/components/wrap-layout';
import img1 from '../assets/images/items/img1.jpg';
import img2 from '../assets/images/items/img2.jpg';
import img3 from '../assets/images/items/img3.jpg';
import img4 from '../assets/images/items/img4.jpg';
import img5 from '../assets/images/items/img5.jpg';
import Image from 'next/image';
import AddItemInCart from '@/app/modals/add-item-cart';
import { toast } from "react-hot-toast";
import "../styles/index.css";
import { callToFetchProductDetails, callToMakeOrderData } from '@/utils/apis';
import ShowItemDetails from '@/app/modals/show-item-details';

const categories = [
    {
        id: "ceramic_pots",
        title: "Ceramic Pots",
        img: img1
    },
    {
        id: "ceramic_crockery",
        title: "Ceramic Crockery",
        img: img2
    },
    {
        id: "ceramic_defuser",
        title: "Ceramic Defuser",
        img: img3
    },
    {
        id: "ceramic_vase",
        title: "Ceramic Vase",
        img: img4
    },
    {
        id: "all",
        title: "All",
        img: img5
    }
];

const Dashboard = () => {
    const [itemInfo, setItemInfo] = useState<any>({});
    const [currentItemId, setCurrentItemId] = useState('');
    const [updatedSearchValue, setUpdatedSearchValue] = useState('');
    const [isLoadingData, setisLoadingData] = useState(true);
    const [itemsDataMain, setItemsDataMain] = useState<any>([]);
    const [itemsData, setItemsData] = useState<any>([]);
    const [isItemsDataLoading, setIsItemsDataLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const [ordersData, setOrdersData] = useState<any>([]);

    useEffect(() => {
        setisLoadingData(true);
        const currentItemData = itemsDataMain && itemsDataMain.filter((user: any) => user.id === currentItemId);
        setItemInfo(currentItemData[0]);
        setisLoadingData(false);
    }, [currentItemId]);

    useEffect(() => {
        setIsItemsDataLoading(true);
        const filteredItemsData = itemsDataMain && itemsDataMain.filter((itm: any) => {
            const name = itm.name.toLowerCase();
            const sku = itm.sku.toLowerCase();
            const size = itm.size.toLowerCase();
            const price = itm.price ? itm.price.toString() : '';
            const category = itm.category.toLowerCase();
            return name.includes(updatedSearchValue.toLowerCase()) ||
                sku.includes(updatedSearchValue.toLowerCase()) ||
                price.includes(updatedSearchValue.toLowerCase()) ||
                category.includes(updatedSearchValue.toLowerCase()) ||
                size.includes(updatedSearchValue.toLowerCase());
        });
        setItemsData(filteredItemsData);
        setIsItemsDataLoading(false);
    }, [updatedSearchValue]);

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const apiBaseUrl = "https://shyamaceramics.in.net/api"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    const makeOrder = async () => {
        const res = await callToMakeOrderData(ordersData, 'order/save');
        setOrdersData([]);
        toast.success('Order placed successfully !!');
        window.location.href = '/orders';
    };

    return <WrapLayout>
        <>
            <ShowItemDetails
                currentItem={itemInfo}
                isLoadingData={isLoadingData}
            />
            <br />
            {
                isItemsDataLoading ?
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
                    <>
                        {
                            (currentCategory && currentCategory.length > 0) ?
                                ((itemsData && itemsData.length) ?
                                    <>
                                        <div className="row" style={{ marginLeft: '1%' }}>
                                            <div className="col-sm-12 col-xs-12 col-6 col-md-6">
                                                <div className="input-group flex-nowrap">
                                                    <span className="input-group-text" id="addon-wrapping">
                                                        @
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search any item .."
                                                        onChange={(event: any) => {
                                                            if (event) {
                                                                setUpdatedSearchValue(event.target.value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-xs-12 col-6 col-md-6">
                                                <button
                                                    className="btn btn-success"
                                                    type="button"
                                                    onClick={makeOrder}
                                                    disabled={ordersData && ordersData.length < 1}
                                                    style={{ marginRight: '5px', marginBottom:'5px' }}
                                                >
                                                    Order Now
                                                </button>
                                            </div>
                                        </div>
                                        <br />
                                        <button
                                            type="button"
                                            className="btn btn-info"
                                            onClick={() => {
                                                setCurrentCategory('');
                                                setOrdersData([]);
                                            }}
                                            style={{ width: '100px', marginLeft: '2%' }}
                                        >
                                            Back
                                        </button>
                                        <br />
                                        <Row style={{ marginTop: '20px', padding: '0 2%' }} id='exportCompletePage'>
                                            {
                                                itemsData.map((item: any, index: any) => {
                                                    const itemImage = (item && item.images && item.images.includes(',')) ? item.images.split(',')[0] : item.images;

                                                    return (
                                                        <Col key={index} md={6} xl={4} xxl={4}>
                                                            <Card
                                                                style={{ marginBottom: '10px', zIndex: 2 }}
                                                            >
                                                                <div className="container-d-c" style={{ height: '250px' }}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#show-items-details-modal"
                                                                    onClick={() => {
                                                                        setCurrentItemId(item.id);
                                                                    }}>
                                                                    <Image loader={() => imageUrlPath + itemImage} className='container-d-c-img' src={imageUrlPath + itemImage} width={100} height={100} alt="Snow" style={{ height: '100%', width: '100%' }} />
                                                                    <div className="bottom-left-d-c" style={{
                                                                        bottom: '25px'
                                                                    }}>{item.name}</div>
                                                                </div>
                                                                <br />
                                                                <div style={{ padding: '0 10px' }}>
                                                                    <div style={{
                                                                        border: '1px solid orange',
                                                                        padding: '2px 5px',
                                                                        margin: '10px 0',
                                                                        cursor: 'pointer'
                                                                    }}>
                                                                        {/* Order Now */}
                                                                    </div>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <div style={{ width: '40%', marginBottom: '10px', fontSize: '14px' }}>Quantity: </div>
                                                                        <input
                                                                            onChange={(event: any) => {
                                                                                if (ordersData && ordersData.some((it: any) => it.id === item.id)) {
                                                                                    const newData = ordersData.filter((it: any) => it.id != item.id);
                                                                                    if (event.target.value > 0) {
                                                                                        let newItem = item;
                                                                                        newItem.quantity = event.target.value;
                                                                                        setOrdersData([...newData, newItem]);
                                                                                    } else {
                                                                                        setOrdersData(newData);
                                                                                    }
                                                                                } else {
                                                                                    if (event.target.value > 0) {
                                                                                        let newItem = item;
                                                                                        newItem.quantity = event.target.value;
                                                                                        setOrdersData([...ordersData, newItem]);
                                                                                    }
                                                                                }
                                                                            }}
                                                                            type="number" style={{ border: '1px solid black', width: '70%', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                                                                    </div>

                                                                    <div style={{ display: 'flex' }}>
                                                                        <div style={{ width: '40%', marginBottom: '10px', fontSize: '14px' }}>Description: </div>
                                                                        <input
                                                                            onChange={(event: any) => {
                                                                                if (ordersData && ordersData.some((it: any) => it.id === item.id)) {
                                                                                    const newData = ordersData.filter((it: any) => it.id != item.id);
                                                                                    let newItem = item;
                                                                                    newItem.desc = event.target.value;
                                                                                    setOrdersData([...newData, newItem]);
                                                                                } else {
                                                                                    let newItem = item;
                                                                                    newItem.desc = event.target.value;
                                                                                    setOrdersData([...ordersData, newItem]);
                                                                                }
                                                                            }}
                                                                            type="text" style={{ border: '1px solid black', width: '70%', paddingLeft: '5px', borderRadius: '5px', height: '25px' }} />
                                                                    </div>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <div style={{ width: '40%', marginBottom: '10px', fontSize: '14px' }}>Price: </div>
                                                                        <div>₹ {item.price}</div>
                                                                    </div>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <div style={{ width: '40%', marginBottom: '10px', fontSize: '14px' }}>Size: </div>
                                                                        <div>
                                                                            <div>{item.size.split('_').join(' ')}</div>
                                                                            <div >Height: {item.height} Dia: {item.dia}</div>
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </> :
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-info"
                                            onClick={() => {
                                                setCurrentCategory('');
                                                setOrdersData([]);
                                            }}
                                            style={{ width: '100px', marginLeft: '2%' }}
                                        >
                                            Back
                                        </button>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '400px',
                                            fontWeight: 'bold',
                                            fontSize: '20px'
                                        }}>
                                            No Data Found
                                        </div>
                                    </>)
                                :
                                <Row style={{ marginTop: '20px', padding: '0 2%' }}>
                                    {
                                        categories.map((item: any, index: any) => {
                                            return <Col key={index} md={6} xl={4} xxl={4}>
                                                <Card style={{ marginBottom: '10px', zIndex: 2 }}>
                                                    <div className="container-d-c" style={{ height: '250px', cursor: 'pointer' }}
                                                        onClick={async () => {
                                                            setIsItemsDataLoading(true);
                                                            const data = await callToFetchProductDetails({
                                                                category: item.id
                                                            });
                                                            setItemsDataMain(data);
                                                            setItemsData(data);
                                                            setIsItemsDataLoading(false);
                                                            setCurrentCategory(item.id);
                                                        }}>
                                                        <Image className='container-d-c-img' src={item.img} alt="Snow" style={{ height: '100%', width: '100%' }} />
                                                        <div className="bottom-left-d-c" style={{
                                                            bottom: '25px'
                                                        }}>{item.title}</div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        })
                                    }
                                </Row>
                        }
                    </>
            }
        </>
    </WrapLayout>
}

export default Dashboard;
