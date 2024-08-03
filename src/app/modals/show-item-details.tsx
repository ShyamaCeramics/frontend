import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageCarousel from '../components/image-carousel';
import imag1 from '../../assets/images/items/img1.jpg';
import imag2 from '../../assets/images/items/img2.jpg';
import imag3 from '../../assets/images/items/img3.jpg';

const ShowItemDetails = ({ currentItem, isLoadingData = true }: any) => {
    const apiBaseUrl = "https://shyama-app.netlify.app/.netlify/functions/api"
    const imageUrlPath = apiBaseUrl + "/resources/static/assets/uploads/";

    const [item, setItem] = useState<any>({});
    const [img1, setimg1] = useState<any>('');
    const [img2, setimg2] = useState<any>('');
    const [img3, setimg3] = useState<any>('');
    const [img4, setimg4] = useState<any>('');
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        setItem(currentItem);
        if (currentItem && currentItem.images) {
            const imgs = currentItem.images && currentItem.images.split(',');
            if (imgs && imgs.length > 0) {
                if (imgs.length === 1) {
                    setimg1(imageUrlPath + imgs[0]);
                } else if (imgs.length === 2) {
                    setimg1(imageUrlPath + imgs[0]);
                    setimg2(imageUrlPath + imgs[1]);
                } else if (imgs.length === 3) {
                    setimg1(imageUrlPath + imgs[0]);
                    setimg2(imageUrlPath + imgs[1]);
                    setimg3(imageUrlPath + imgs[2]);
                } else if (imgs.length === 4) {
                    setimg1(imageUrlPath + imgs[0]);
                    setimg2(imageUrlPath + imgs[1]);
                    setimg3(imageUrlPath + imgs[2]);
                    setimg4(imageUrlPath + imgs[3]);
                }
            }
        }
    }, [currentItem]);

    return <>
        <div className="modal" tabIndex={-1} id="show-items-details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{item && item.title}</h5>
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
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        {/* {item.img &&
                                            <Image className='container-d-c-img' src={item.img} alt="Snow" style={{ height: '100%', width: '100%' }} />
                                        } */}
                                        <div className="container-d-c" style={{ height: '200px', display: 'flex', alignItems: 'center', overflowY: 'hidden' }}>
                                            <ImageCarousel
                                                img1={img1 ? img1 : imag1}
                                                img2={img2 ? img2 : imag2}
                                                img3={img3 ? img3 : imag3}
                                                img4={img4 ? img4 : img4}
                                                slideIndex={slideIndex}
                                                setSlideIndex={setSlideIndex}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div>
                                            ID: {item.id}
                                            <br />
                                            Name: {item.name}
                                            <br />
                                            Price: {item.price}
                                            <br />
                                            Size: {item && item.size && item.size.split('_').join(' ')}
                                            <br />
                                            SKU: {item.sku}
                                            <br />
                                            Height: {item.height} in
                                            <br />
                                            Dia: {item.dia} in
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                    }
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ShowItemDetails;
