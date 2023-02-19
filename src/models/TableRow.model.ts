export default interface TableRow {
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] }>;
}
