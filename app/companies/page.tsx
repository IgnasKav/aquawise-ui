import { api } from '../../api/api';
import CompanyList from './components/CompanyList';
import { RequireAuth } from '../../components/auth/RequireAuth';

export default async function Companies() {
    const companies = await api.Companies.getAll();
    // const { mutate } = useMutation(api.Companies.confirmApplication, {
    //     onSuccess: () => queryClient.invalidateQueries(['clients']),
    // });

    return (
        <RequireAuth>
            <CompanyList companies={companies} />
        </RequireAuth>
    );
}
