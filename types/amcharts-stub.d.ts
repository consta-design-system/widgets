import { ExtendedFeatureCollection } from 'd3'

// Перебиваем родные типы библиотеки для совместимости с d3
// Через declare module перебить не удаётся: https://github.com/microsoft/TypeScript/issues/17042
declare const content: ExtendedFeatureCollection

export default content
