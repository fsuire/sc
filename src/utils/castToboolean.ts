export default function castToboolean(source: string | number | boolean | null | undefined): boolean {
  return ![false, null, undefined, 0, '', 'false', 'null', 'undefined', '0'].includes(source)
}
