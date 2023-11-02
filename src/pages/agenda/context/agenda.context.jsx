import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

/**
 * @typedef {'mobileFilter' | 'shiftOptions' | 'emptyShiftOptions' | null} DrawerToOpen
 */

/**
 * @typedef Filters
 * @property {number} profesionalId
 * @property {number} especialidadId
 * @property {boolean | undefined} libres
 * @property {string} fechaDesde
 * @property {string} fechaHasta
 */

/** @type {Filters} */
const initialFilters = {
	profesionalId: undefined,
	especialidadId: undefined,
	libres: undefined,
	fechaDesde: dayjs().format('MM-DD-YY'),
	fechaHasta: dayjs().format('MM-DD-YY'),
};

/* eslint-disable */
const initialData = {
	filters: initialFilters,
	updateFilters: (/** @type {Partial<Filters>} */ filters) => undefined,
	shiftInView: null,
	updateShiftInView: (newShift) => undefined,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	openDrawer: (/** @type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
};
/* eslint-enable */

const AgendaContext = createContext(initialData);

export const AgendaProvider = ({ children }) => {
	const [filters, setFilters] = useState(initialData.filters);
	const [shiftInView, setShiftInView] = useState(initialData.shiftInView);

	const [drawerToOpen, setDrawerToOpen] = useState(null);

	const updateFilters = (newFilters) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const updateShiftInView = (newShift) => {
		setShiftInView(newShift);
	};

	const openDrawer = (drawerToOpen) => {
		setDrawerToOpen(drawerToOpen);
	};

	const closeDrawer = () => {
		setDrawerToOpen(null);
	};

	const state = {
		filters,
		updateFilters,
		shiftInView,
		updateShiftInView,
		drawerToOpen,
		openDrawer,
		closeDrawer,
	};

	return <AgendaContext.Provider value={state}>{children}</AgendaContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgendaContext = () => useContext(AgendaContext);
