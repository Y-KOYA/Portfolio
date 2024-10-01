export function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`環境変数${key}が設定されていません`);
  }
  return value;
}