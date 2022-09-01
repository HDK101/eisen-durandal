export default function chunkArray<T>(array: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size));
  }
  return groups;
}
