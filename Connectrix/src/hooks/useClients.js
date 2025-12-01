import { useClientStore } from '../store';

export const useClients = () => {
  const { clients, selectedClient, setClients, setSelectedClient, addClient, updateClient, deleteClient } = useClientStore();

  return {
    clients,
    selectedClient,
    setClients,
    setSelectedClient,
    addClient,
    updateClient,
    deleteClient,
  };
};
