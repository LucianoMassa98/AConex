import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getSpecialties = async (clinicId) => {
	const response = await api.get(`/especialidades/${clinicId}`);
	return response.data;
};

export const useSpecialties = () => {
	const fakeClinicId = 1;

	return useQuery({
		queryKey: ['specialties', fakeClinicId],
		queryFn: () => getSpecialties(fakeClinicId),
	});
};
