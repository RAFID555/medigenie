
import { useState, useEffect, useCallback } from 'react';

export interface PetCheckup {
  id: string;
  petName: string;
  date: string;
  veterinarian: string;
  notes: string;
}

export interface PetVaccination {
  id: string;
  petName: string;
  vaccineName: string;
  date: string;
  nextDueDate: string;
  completed: boolean;
}

export interface PetMedication {
  id: string;
  petName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  notes: string;
}

// Custom hook to persist pet data in localStorage with memoized setters
const usePetCareStorage = () => {
  const [checkups, setCheckupsState] = useState<PetCheckup[]>(() => {
    const savedCheckups = localStorage.getItem('petCheckups');
    return savedCheckups ? JSON.parse(savedCheckups) : [];
  });

  const [vaccinations, setVaccinationsState] = useState<PetVaccination[]>(() => {
    const savedVaccinations = localStorage.getItem('petVaccinations');
    return savedVaccinations ? JSON.parse(savedVaccinations) : [];
  });

  const [medications, setMedicationsState] = useState<PetMedication[]>(() => {
    const savedMedications = localStorage.getItem('petMedications');
    return savedMedications ? JSON.parse(savedMedications) : [];
  });

  // Save checkups to localStorage when they change
  useEffect(() => {
    localStorage.setItem('petCheckups', JSON.stringify(checkups));
  }, [checkups]);

  // Save vaccinations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('petVaccinations', JSON.stringify(vaccinations));
  }, [vaccinations]);

  // Save medications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('petMedications', JSON.stringify(medications));
  }, [medications]);

  // Create memoized setters to prevent unnecessary re-renders
  const setCheckups = useCallback((newCheckups: PetCheckup[]) => {
    setCheckupsState(newCheckups);
  }, []);

  const setVaccinations = useCallback((newVaccinations: PetVaccination[]) => {
    setVaccinationsState(newVaccinations);
  }, []);

  const setMedications = useCallback((newMedications: PetMedication[]) => {
    setMedicationsState(newMedications);
  }, []);

  return {
    checkups,
    setCheckups,
    vaccinations,
    setVaccinations,
    medications,
    setMedications
  };
};

export default usePetCareStorage;
