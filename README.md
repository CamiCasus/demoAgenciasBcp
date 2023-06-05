# DemoAgenciasBcp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Funcionalidades incluídas

 - Mostrar el splashScreen al momento de iniciar la página que desaparece al finalizar el primer NavigationEnd (*Se agregó un delay de 2 segundos para que se pueda apreciar un poco mejor la funcionalidad*) 
 - Listar Agencias
 - Paginar Agencias (de 20 en 20) utilizando infinite scroll
 - Modificar Agencias
 - Buscar agencias
 - Marcar como favorita una agencia
 - Visualizar la ubicación en el mapa de una agencia.

## Notas

Se tienen 2 archivos con data (assets/data/agencias_large.json y assets/data/agencias.json). El primero sirve para tener mayor data y poder probar el paginado, el segundo tiene menor data y ayuda a probar mejor el agregado de agencias.