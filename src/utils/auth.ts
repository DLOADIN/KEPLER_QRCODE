export const validateCredentials = (email: string, password: string): boolean => {
  return email === 'admin@example.com' && password === 'admin123';
};