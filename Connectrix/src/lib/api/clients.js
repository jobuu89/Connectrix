// Mock API functions for client management
// In a real application, these would make HTTP requests to a backend API

export const getClients = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return empty array since we removed demo data
  return [];
};

export const disconnectClient = async (clientId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // In a real app, this would make a PUT/PATCH request to disconnect the client
  console.log(`Disconnected client ${clientId}`);
};

export const limitSpeed = async (clientId, speedMbps) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // In a real app, this would make a PUT/PATCH request to limit the client's speed
  console.log(`Limited client ${clientId} to ${speedMbps} Mbps`);
};

export const sendReminder = async (clientId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // In a real app, this would make a POST request to send a payment reminder
  console.log(`Sent payment reminder to client ${clientId}`);
};
