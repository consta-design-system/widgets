// import React from 'react'
//
// import { Example } from '@/_private/storybook'
//
// import { LinearChart } from '../../LinearChart'
// import {
//   gridConfigFormat,
//   gridConfigLabel,
//   gridConfigPaddings,
//   gridConfigSimple,
//   linesBoundaries,
//   linesFeatures,
//   linesFormat,
//   linesNull,
//   linesSimple,
//   linesThreshold,
//   linesWithoutGradient,
//   threshold,
// } from '../data.mock'
//
// export const LinearChartExampleWithoutGradient = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       // title="Название графика"
//       lines={linesWithoutGradient}
//       gridConfig={gridConfigSimple}
//       yDimensionUnit="единицы"
//     />
//   </Example>
// )
//
// export const LinearChartExampleLinesFeatures = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       // title="Название графика"
//       lines={linesFeatures}
//       gridConfig={gridConfigPaddings}
//       yDimensionUnit="единицы"
//     />
//   </Example>
// )
//
// export const LinearChartExampleGeneral = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       // title="Название графика"
//       lines={linesSimple}
//       gridConfig={gridConfigSimple}
//       yDimensionUnit="единицы"
//     />
//   </Example>
// )
//
// export const LinearChartExampleFormatLabelTooltip = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       yDimensionUnit="км"
//       lines={linesFormat}
//       gridConfig={gridConfigFormat}
//       formatValueForLabel={v => new Date(v).toLocaleDateString()}
//       formatValueForTooltip={v => `${v} км`}
//       formatValueForTooltipTitle={v => {
//         const title = new Date(v)
//           .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
//           .replace('г.', '')
//         return title[0].toUpperCase() + title.slice(1)
//       }}
//     />
//   </Example>
// )
//
// export const LinearChartExampleFormatLabelData = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       lines={linesFormat}
//       gridConfig={gridConfigFormat}
//       formatValueForLabel={v => new Date(v).toLocaleDateString()}
//     />
//   </Example>
// )
//
// export const LinearChartExampleFormatLabelProcent = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       lines={linesSimple}
//       gridConfig={gridConfigSimple}
//       formatValueForLabel={v => `${v} %`}
//     />
//   </Example>
// )
//
// /**
//  * Пример пока отключен так как проявляется проблема с расчетом
//  * дробных px в компоненте Axis.
//  */
// /*
// export const LinearChartExampleNotHorizontal = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       title="Очень красивый график"
//       lines={linesSimple}
//       gridConfig={gridConfigSimple}
//       unit="км"
//       background="linear-gradient(to right, #f54d4d48, transparent)"
//       isHorizontal={false}
//     />
//   </Example>
// )
// */
//
// export const LinearChartExampleLabel = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       // title="Очень красивый график"
//       lines={linesSimple}
//       gridConfig={gridConfigLabel}
//       yDimensionUnit="км"
//     />
//   </Example>
// )
//
// export const LinearChartExampleDirectionXtoLeft = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart lines={linesSimple} gridConfig={gridConfigSimple} />
//   </Example>
// )
//
// export const LinearChartExampleDirectionXtoRight = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart lines={linesSimple} gridConfig={gridConfigSimple} />
//   </Example>
// )
//
// export const LinearChartExampleDirectionYtoTop = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart lines={linesSimple} gridConfig={gridConfigSimple} />
//   </Example>
// )
//
// export const LinearChartExampleDirectionYtoBottom = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart lines={linesSimple} gridConfig={gridConfigSimple} yDimensionUnit="км" />
//   </Example>
// )
//
// export const LinearChartExampleNull = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart lines={linesNull} gridConfig={gridConfigSimple} />
//   </Example>
// )
//
// export const LinearChartExampleBoundaries = () => (
//   <Example width="600px" height="300px" margin="l">
//     <LinearChart lines={linesBoundaries} gridConfig={gridConfigSimple} />
//   </Example>
// )
//
// export const LinearChartExampleZoom = () => (
//   <Example width="300px" height="150px" margin="l">
//     <LinearChart
//       // title="Очень красивый график"
//       lines={linesSimple}
//       gridConfig={gridConfigSimple}
//       yDimensionUnit="км"
//     />
//   </Example>
// )
//
// export const LinearChartExampleThreshold = () => (
//   <Example width="700px" height="300px" margin="l">
//     <LinearChart
//       // title="График с предельными значениями"
//       lines={linesThreshold}
//       gridConfig={gridConfigSimple}
//       threshold={threshold}
//       yDimensionUnit="тыс. м3"
//       formatValueForLabel={v => new Date(v).toLocaleDateString()}
//       formatValueForTooltip={v => `${v} тыс м3`}
//       formatValueForTooltipTitle={v => {
//         const title = new Date(v)
//           .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
//           .replace('г.', '')
//         return title[0].toUpperCase() + title.slice(1)
//       }}
//     />
//   </Example>
// )
