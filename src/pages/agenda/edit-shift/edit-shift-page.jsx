import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useEditShifts } from '../hooks/use-edit-shifts';

export const EditShiftPage = () => {
	const { data: patients } = usePatients();
	const { mutate, isSuccess } = useEditShifts();
	const {
		state: { shift },
	} = useLocation();
	const navigate = useNavigate();

	const handleMutate = (newFields) => {
		const { paciente, ...rest } = newFields;
		mutate(
			{
				shiftId: shift.id,
				pacienteId: paciente.id,
				...rest,
			},
			{ onSuccess: () => setTimeout(() => navigate('..', { relative: 'path' }), 4_000) }
		);
	};

	return (
		<>
			<Helmet>
				<title>Editar turno</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
					Editar turno
				</Typography>
				<Typography
					variant="h5"
					textTransform="capitalize"
					fontWeight="bold"
					component="p"
					sx={{ mb: 3, mt: 1 }}
				>
					{dayjs(shift.date).format('MMMM DD | HH:mm')}
				</Typography>
				<Form
					defaultValues={{
						paciente: shift.paciente,
						observacion: shift.observacion,
						presentismo: shift.presentismo,
						obraSocial: shift.obraSocial,
					}}
					onSubmit={handleMutate}
				>
					<Stack spacing={4}>
						<Autocomplete
							name="paciente"
							inputProps={{ variant: 'standard', label: 'Paciente' }}
							options={patients ?? []}
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
						/>
						<TextInput
							name="observacion"
							variant="standard"
							label="Observación"
							rules={{ required: false }}
						/>
						<TextInput
							name="presentismo"
							variant="standard"
							label="Presentismo"
							rules={{ required: false }}
						/>
						<TextInput
							name="obraSocial"
							variant="standard"
							label="Obra Social"
							rules={{ required: false }}
						/>
						<Button type="submit" variant="contained">
							Modificar turno
						</Button>
					</Stack>
				</Form>
				<Slide direction="up" in={isSuccess} mountOnEnter unmountOnExit>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno editado con éxito!
					</Alert>
				</Slide>
			</Container>
		</>
	);
};
