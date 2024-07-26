import { cookies } from 'next/headers';

export const getAuthToken = () => {
    const cookieStore = cookies();
    const authToken = cookieStore?.get('authToken');
    return authToken?.value
}