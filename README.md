# Vue canlendar and vue clock

<div align="center">
  <img width="436" height="398" src="/src/image/calendar.png">
</div>

<div align="center">
  <img width="436" height="398" src="/src/image/clock.png">
</div>

Caracteriscticas del componente calendar y clock.

- Seleccione una fecha (dia mes y año)
- Limite el rango del calendario entre años
- Seleccione una hora
- seleccione los minutos
- Definir una fecha al calendario para visualizar (YYYY-MM-DD)
- Definir una hora al clock para visualizar (hh:mm:ss a)

## Instalaccion

- Instale ejecutando `npm install vue-input-date-time`.
- Importe agregando `import { VueInputDateTime, VueClock } from  "vue-input-date-time";`.
- Usar Calendar agregando `<InputDateTime/>`. Puede agregar el v-model para enviar una fecha y obtener una seleccionada
-  Usar Clock agregando `<VueClock/>`. Puede agregar el v-model para enviar un hora y obtener una seleccionada



## Empezando

###   Compatibilidad

Su proyecto necesita usar vue 2.x.x o posterior.
***Nodejs*** - v16.17.0
***npm*** - 9.6.7

### Instalación

  
Agregue Clanedar a su proyecto ejecutando `npm install vue-input-date-time` .

### Uso

He aquí un ejemplo de uso básico:

```js
<template>
	<div  id="app">
	<VueClock v-model="hours"></VueClock>
	<VueInputDateTime v-model="date"></VueInputDateTime>
	</div>
</template>

<script>
	import { VueInputDateTime, VueClock } from  "input-date-time";

	export  default {
		components: {
			VueClock,
			VueInputDateTime,
		},
		data: () => ({
			hours: '00:00:00 am',
			date: '2023-01-22'
		})
	};
</script>
```
**Nota**  - el v-model es opcional si no le envias el atributo el calendar y el clock tomaran los valores de la fecha actual.
