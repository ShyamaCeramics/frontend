import WrapLayout from '@/app/components/wrap-layout';
import UserDetails from '@/app/modals/user-details';
import { themeColor } from '@/config/configs';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';


const UsersList = () => {
    const [currentOpenRowId, setCurrentOpenRowId] = useState('');
    const [currentUserData, setCurrentUserData] = useState<any>({});
    const [isLoadingData, setisLoadingData] = useState(true);

    const usersData = [
        {
            name: 1,
            phone_no: 'User 1',
            address: 'Ghaziabad'
        },
        {
            name: 2,
            phone_no: 'User 2',
            address: 'Ghaziabad'
        }
    ];

    useEffect(() => {
        setisLoadingData(true);
        const currentModalUserData = usersData && usersData.filter((user: any) => user.id === currentOpenRowId);
        setCurrentUserData(currentModalUserData[0]);
        setisLoadingData(false);
    }, [currentOpenRowId]);

    return <WrapLayout>
        <>
            <UserDetails
                isLoadingData={isLoadingData}
                currentUserData={currentUserData}
            />
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Users Details</h3>
            <Card style={{ margin: '2%' }}>
                <table className="table table-hover">
                    <thead style={{ backgroundColor: themeColor }}>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData && usersData.map((user: any, index) => {
                            return <tr key={index} onClick={() => {
                                setCurrentOpenRowId(user.id);
                            }}
                                data-bs-toggle="modal" data-bs-target="#users-details-modal"
                            >
                                <th scope="row">{user.name}</th>
                                <td>{user.phone_no}</td>
                                <td>{user.address}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    </WrapLayout>
}

export default UsersList;
