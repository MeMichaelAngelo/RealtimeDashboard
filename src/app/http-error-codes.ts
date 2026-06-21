export function getErrorMessage(statusCode: number): string {
  const errorMessages: Record<number, string> = {
    401: 'Invalid email or password',
    403: 'You do not have permission to perform this action',
    404: 'The requested resource was not found',
    500: 'An error occurred on the server. Please try again later',
  };

  return (
    errorMessages[statusCode] ??
    'An unexpected error occurred. Please try again later.'
  );
}
