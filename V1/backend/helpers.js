export const getRequiredEnv = (envVar) => {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`Could not find environment variable: ${envVar}`);
  }
  return value;
};
