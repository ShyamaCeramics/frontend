import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import WrapLayout from '@/app/components/wrap-layout';
import "../../styles/index.css";
import Image from 'next/image';
import img1 from '../../assets/images/items/img1.jpg';
import img2 from '../../assets/images/items/img2.jpg';
import img3 from '../../assets/images/items/img3.jpg';
import img4 from '../../assets/images/items/img4.jpg';
import img5 from '../../assets/images/items/img5.jpg';
import ShowItemDetails from '@/app/modals/show-item-details';
import EditItemDetails from '@/app/modals/edit-item-details';
import AddItemDetails from '@/app/modals/add-item-details';
import { callToFetchProductDetails } from '@/utils/apis';

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

const AdminDashboard = () => {
    const [itemInfo, setItemInfo] = useState<any>({});
    const [itemEditInfo, setItemEditInfo] = useState<any>({});
    const [currentItemId, setCurrentItemId] = useState('');
    const [currentEditItemId, setCurrentEditItemId] = useState('');
    const [updatedSearchValue, setUpdatedSearchValue] = useState('');
    const [isLoadingData, setisLoadingData] = useState(false);
    const [isEditLoadingData, setisEditLoadingData] = useState(false);
    const [itemsDataMain, setItemsDataMain] = useState<any>([]);
    const [itemsData, setItemsData] = useState<any>([]);
    const [isItemsDataLoading, setIsItemsDataLoading] = useState(false);
    const [isAddLoadingData, setisAddLoadingData] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('');

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
            return name.includes(updatedSearchValue.toLowerCase()) ||
                sku.includes(updatedSearchValue.toLowerCase()) ||
                size.includes(updatedSearchValue.toLowerCase());
        });
        setItemsData(filteredItemsData);
        setIsItemsDataLoading(false);
    }, [updatedSearchValue]);

    const fetchCurrentCatgoryData = async () => {
        setIsItemsDataLoading(true);
        const data = await callToFetchProductDetails({
            category: currentCategory
        });
        setItemsDataMain(data);
        setItemsData(data);
        setIsItemsDataLoading(false);
    };

    const apiBaseUrl = "https://shyama-app.netlify.app/.netlify/functions/api"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    return <WrapLayout>
        <React.Fragment>
            <ShowItemDetails
                currentItem={itemInfo}
                isLoadingData={isLoadingData}
            />
            <EditItemDetails
                currentItem={itemEditInfo}
                isLoadingData={isEditLoadingData}
            />
            <AddItemDetails
                setIsItemsDataLoading={setIsItemsDataLoading}
                fetchCurrentCatgoryData={fetchCurrentCatgoryData}
            />

            <Row style={{ marginTop: '20px', padding: '0 2%' }}>
                {
                    (currentCategory && currentCategory.length > 0) &&
                    <div className="row">
                        <div className="col-7 col-md-6">
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
                        <div className="col-5 col-md-6">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                data-bs-toggle="modal" data-bs-target="#add-items-details-modal"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                }
                <br /><br />

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
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    setCurrentCategory('');
                                                }}
                                                style={{ width: '100px', marginLeft: '2%' }}
                                            >
                                                Back
                                            </button>
                                            <br />
                                            <Row style={{ marginTop: '20px', padding: '0 2%' }}>
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
                                                                    </div>
                                                                    <br />
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </> :
                                        <>
                                            <br />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    setCurrentCategory('');
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

            </Row>
        </React.Fragment>
    </WrapLayout>
}

export default AdminDashboard;
