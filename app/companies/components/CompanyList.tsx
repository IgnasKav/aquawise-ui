'use client';

import { Card, Table } from '@mantine/core';
import { Company } from '../../../models/companies/Company';

type CompanyListProps = {
    companies: Company[] | undefined;
};

type CompanyListItemProps = {
    company: Company;
};

const CompanyListItem = ({ company }: CompanyListItemProps) => {
    return (
        <Table.Tr>
            <Table.Td>{company.name}</Table.Td>
            <Table.Td>{company.code}</Table.Td>
            <Table.Td>{company.email}</Table.Td>
            <Table.Td>{company.phone}</Table.Td>
            <Table.Td>{company.status}</Table.Td>
        </Table.Tr>
    );
};

const CompanyList = ({ companies }: CompanyListProps) => {
    return (
        <Card shadow="md" radius="md" mx={20} p="xl" withBorder>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Code</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {companies?.map((c) => (
                        <CompanyListItem key={c.id} company={c} />
                    ))}
                </Table.Tbody>
            </Table>
        </Card>
    );
};

export default CompanyList;
