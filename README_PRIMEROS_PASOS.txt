MEDMAX TECHNOLOGIES COL - VERSIÓN 1.0
=====================================

QUÉ CONTIENE
- Portal web adaptable a computador y celular.
- Inicio y menú lateral.
- Secciones iniciales: Emssanar, SOS, Comfenalco y Cruz Verde.
- Buscador de herramientas.
- Administración para agregar secciones y herramientas.
- Exportación de una copia de seguridad de los datos.

IMPORTANTE ANTES DE PUBLICAR
GitHub Pages publica un sitio web estático. El portal de esta versión es público:
cualquier persona que tenga la dirección puede abrirlo. No guardes datos de pacientes,
documentos confidenciales, contraseñas, tokens, historias clínicas ni información
reservada. Los enlaces registrados también pueden quedar visibles para visitantes.

La administración de esta versión guarda los cambios en el almacenamiento local
del navegador (localStorage). Por tanto:
- Los cambios se ven en el mismo navegador y dispositivo.
- No se sincronizan automáticamente con otros computadores o usuarios.
- Si borras los datos del navegador, puedes perder los cambios.
- Descarga periódicamente la copia JSON desde Administración.
Para administración compartida y acceso privado necesitaremos una base de datos,
autenticación y un servicio backend; eso no lo proporciona GitHub Pages por sí solo.

CÓMO PUBLICAR GRATIS EN GITHUB PAGES
1. Entra a https://github.com/ y crea una cuenta o inicia sesión.
2. Pulsa el signo + (arriba a la derecha) y selecciona "New repository".
3. En Repository name escribe exactamente:
   medmax-technologies-col
4. Selecciona "Public". Para GitHub Pages gratuito el repositorio debe ser público
   en el plan gratuito estándar. No subas secretos ni archivos privados.
5. Pulsa "Create repository".
6. Dentro del repositorio pulsa "Add file" > "Upload files".
7. Descomprime el ZIP en tu computador. Arrastra index.html, styles.css y app.js
   (y si quieres README_PRIMEROS_PASOS.txt) a la ventana de GitHub.
   Debes subir los archivos directamente a la raíz del repositorio, no dentro de
   una carpeta adicional.
8. En "Commit changes", deja el mensaje sugerido y pulsa "Commit changes".
9. Abre Settings (configuración del repositorio).
10. En el menú lateral entra a Pages.
11. En "Build and deployment", elige "Deploy from a branch".
12. En Branch selecciona "main" y carpeta "/ (root)". Pulsa Save.
13. Espera unos minutos y vuelve a Settings > Pages. GitHub mostrará la dirección
    publicada, normalmente:
    https://TU-USUARIO.github.io/medmax-technologies-col/
14. Abre esa dirección. Si no carga inmediatamente, espera unos minutos y actualiza.

CÓMO AGREGAR UNA HERRAMIENTA
1. Abre el portal.
2. Entra en Administración.
3. En "Agregar herramienta", selecciona la empresa.
4. Escribe nombre, categoría y descripción.
5. En "Enlace para abrir" pega la dirección web de la aplicación, si ya está alojada.
6. En "Enlace para descargar" pega un enlace directo o compartido al archivo, si aplica.
7. Pulsa "Guardar herramienta".
8. Descarga una copia de seguridad JSON desde la sección "Datos del portal".

CÓMO AGREGAR UNA SECCIÓN
1. Entra a Administración.
2. En "Agregar empresa / sección principal", escribe nombre, sigla y descripción.
3. Pulsa "Agregar sección".

CÓMO INCORPORAR LOS PROGRAMAS PYTHON
Un archivo .py no se ejecuta directamente en GitHub Pages porque Pages solo aloja
archivos estáticos. Hay dos rutas:
A. Convertir la lógica del programa Python a JavaScript para que funcione dentro
   del navegador. Es apropiado para validadores y procesadores de archivos que
   puedan ejecutarse localmente sin servidor.
B. Mantener Python y convertirlo en una aplicación web con backend (por ejemplo,
   FastAPI o Flask) y alojarla en un servicio que ejecute Python. El portal enlaza
   a esa aplicación. Hay que revisar límites, costos, privacidad y disponibilidad
   del proveedor antes de elegirlo.

Antes de migrar cada programa, revisar:
- código fuente y versión de Python;
- librerías/dependencias (requirements.txt);
- archivos de entrada y salida;
- tamaño de archivos procesados;
- si usa Excel, carpetas locales, bases de datos, APIs o credenciales;
- si contiene información personal o confidencial.
No compartas contraseñas, claves API ni datos reales sensibles al entregar el código.

RECOMENDACIÓN
Primero publica y prueba el portal vacío con datos ficticios. Después incorpora
una herramienta sencilla de prueba. No subas programas ni archivos de trabajo
confidenciales a un repositorio público.

---------------------------------------------
ACTUALIZACION V1.1 - HERRAMIENTAS PYTHON
---------------------------------------------
Se incorporan:
- Comfenalco > Gestión de archivos > Comprimir subcarpetas.
- Global > Gestión de archivos > Copiar carpetas de facturas por prefijo.

La lógica se adapta del archivo Python "herramientas_gui (3).py".
Las herramientas web trabajan localmente en el navegador y requieren Chrome o Edge
de escritorio con HTTPS y permisos de acceso a las carpetas seleccionadas.

INSTALACION:
1. Descomprime este ZIP.
2. Sube el contenido al repositorio medmax-technologies-col.
3. Confirma con Commit changes.
4. Espera la actualización de GitHub Pages.
5. Entra a Medmax > Herramientas y prueba las dos nuevas opciones.

RECOMENDACION:
Primero prueba con COPIAS de carpetas y un CSV de prueba. No uses la carpeta
productiva hasta verificar que los resultados coinciden con el Python original.

NOTA:
La versión web no ejecuta Python dentro de GitHub Pages. Convierte la operación
de archivos a JavaScript en el navegador. Si una herramienta futura depende de
librerías Python que no puedan trasladarse al navegador, se evaluará una
arquitectura con backend.


---------------------------------------------
ACTUALIZACION V1.2 - BUSQUEDA OPTIMIZADA
---------------------------------------------
Global ya no vuelve a recorrer la raiz para cada nivel. Explora el arbol una sola vez
por niveles, detiene la exploracion de una carpeta cuando ya fue identificada como
factura (igual que el Python original), muestra avance real y conserva modo de prueba.
Comfenalco incorpora avance por subcarpeta y mejor registro de progreso.

IMPORTANTE: pruebe primero Global con "Solo listar coincidencias; no copiar".
