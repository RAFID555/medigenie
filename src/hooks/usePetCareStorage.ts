
import { useState, useEffect } from 'react';

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

// Custom hook to persist pet data in localStorage
const usePetCareStorage = () => {
  const [checkups, setCheckups] = useState<PetCheckup[]>(() => {
    const savedCheckups = localStorage.getItem('petCheckups');
    return savedCheckups ? JSON.parse(savedCheckups) : [];
  });

  const [vaccinations, setVaccinations] = useState<PetVaccination[]>(() => {
    const savedVaccinations = localStorage.getItem('petVaccinations');
    return savedVaccinations ? JSON.parse(savedVaccinations) : [];
  });

  const [medications, setMedications] = useState<PetMedication[]>(() => {
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
