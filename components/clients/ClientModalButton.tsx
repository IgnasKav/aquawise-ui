import { Button, Modal, Table } from '@mantine/core';
import { useState } from 'react';
import { Company, CompanyStatus } from '../../models/companies/Company';
import { Device } from '../../models/companies/CompanyClient';

interface ClientModalButtonArgs {
    devices: Device[];
}

export const ClientModalButton = ({ devices }: ClientModalButtonArgs) => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setModalOpened(true)}>Devices</Button>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="User devices"
            >
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Salt</th>
                            <th>Leak</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices?.map((device: Device) => (
                            <tr key={device.mac}>
                                <td>{device.name}</td>
                                <td>
                                    {device.saltPercentage
                                        ? device.saltPercentage + '%'
                                        : 'Not configured'}
                                </td>
                                <td>{device.leak ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal>
        </>
    );
};
