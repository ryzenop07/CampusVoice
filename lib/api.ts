const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    console.log(`API Call: ${API_URL}${endpoint}`, options.method || 'GET');
    
    const response = await fetch(`${API_URL}${endpoint}`, { 
      ...options, 
      headers,
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('API Call Failed:', error);
    throw error;
  }
};

export const authAPI = {
  registerCollege: (data: any) => apiCall('/auth/register/college', { method: 'POST', body: JSON.stringify(data) }),
  registerStudent: (data: any) => apiCall('/auth/register/student', { method: 'POST', body: JSON.stringify(data) }),
  login: (email: string, password: string) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
};

export const collegeAPI = {
  getAll: () => apiCall('/colleges'),
  getById: (id: string) => apiCall(`/colleges/${id}`),
};

export const complaintAPI = {
  create: (data: any) => apiCall('/complaints', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiCall('/complaints'),
  update: (id: string, data: any) => apiCall(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string) => apiCall(`/complaints/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  updatePriority: (id: string, priority: string) => apiCall(`/complaints/${id}/priority`, { method: 'PUT', body: JSON.stringify({ priority }) }),
  assign: (id: string, department: string | null, staff: string | null) => apiCall(`/complaints/${id}/assign`, { method: 'PUT', body: JSON.stringify({ department, staff }) }),
  addNote: (id: string, content: string) => apiCall(`/complaints/${id}/notes`, { method: 'POST', body: JSON.stringify({ content }) }),
  addResponse: (id: string, response: string) => apiCall(`/complaints/${id}/response`, { method: 'POST', body: JSON.stringify({ response }) }),
};
