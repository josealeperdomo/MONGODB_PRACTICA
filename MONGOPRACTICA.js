// -------------------- EJERCICIO A REALIZAR

/*

1) Crear una base de datos llamada empresas
2) Crear las colecciones "usuarios", "empresas", "inventario".
3) Crear 10 usuarios con las propiedades: nombre, apellido, edad, sexo, salario, empresa.
4) Crear 10 empresas con las propiedades: nombre, area, cantidad de empleados, fecha de fundacion.
5) Crear 10 inventarios con las propiedades: lista de productos fisicos (nombre,precio), lista de productos
digitales (nombre,precio), inversion de inventario, costo de venta.
6) Trae todos los usuarios que formen parte de una empresa con la informacion de la empresa.
7) Trae todos los usuarios mayores a 35 annos y dales un bono de 250$.
8) Trae todas las empresas que tengan una cantidad de empleados mayores a 5.
9) Trae todos los usuarios cuyo nombre empiece por "E".
10) Borra solo dos usuarios cuya edad sea menor a 20.

*/


//2
db.createCollection("usuarios")
db.createCollection("empresas")
db.createCollection("inventario")

//3
db.usuarios.insertMany([
    {nombre:"Maria",apellido:"Sanchez",edad:18,sexo:"F",salario:1520,empresa:"Nebulix"},
    {nombre:"Carlos",apellido:"Perdomo",edad:25,sexo:"M",salario:8000,empresa:"Zygnax"},
    {nombre:"Lucia",apellido:"Gomez",edad:38,sexo:"F",salario:1250,empresa:"Quixotex"},
    {nombre:"Juan",apellido:"Alvarez",edad:17,sexo:"M",salario:500,empresa:"Quixotex"},
    {nombre:"Jose",apellido:"Guerra",edad:41,sexo:"M",salario:200,empresa:"Lumivox"},
    {nombre:"Susana",apellido:"Chavez",edad:19,sexo:"F",salario:4210,empresa:"Nebulix"},
    {nombre:"Pedro",apellido:"Molina",edad:20,sexo:"M",salario:1000,empresa:"Aetheris"},
    {nombre:"Esmeralda",apellido:"Rodriguez",edad:23,sexo:"F",salario:900,empresa:"Synthor"},
    {nombre:"Ernesto",apellido:"Loyola",edad:36,sexo:"M",salario:700,empresa:"Novaflex"},
    {nombre:"Eponine",apellido:"Valdez",edad:32,sexo:"F",salario:12000,empresa:"ZephyrTech"}
])

//4
db.empresas.insertMany([
    {nombre:"Zygnax",area:"Tecnologia",cantidad_de_empleados:150,fecha_de_fundacion:"2006/10/14"},
    {nombre:"Quixotex",area:"Moda",cantidad_de_empleados:25,fecha_de_fundacion:"1995/10/12"},
    {nombre:"Lumivox",area:"Energia",cantidad_de_empleados:300,fecha_de_fundacion:"1954/10/30"},
    {nombre:"Nebulix",area:"Entretenimiento",cantidad_de_empleados:705,fecha_de_fundacion:"1999/10/31"},
    {nombre:"Xylosoft",area:"Aplicaciones",cantidad_de_empleados:700,fecha_de_fundacion:"1980/10/14"},
    {nombre:"ZephyrTech",area:"Aeroespacial",cantidad_de_empleados:614,fecha_de_fundacion:"2001/10/05"},
    {nombre:"Novaflex",area:"Dispositivos medicos",cantidad_de_empleados:91,fecha_de_fundacion:"2012/10/31"},
    {nombre:"Quantumix",area:"Computacion cuantica",cantidad_de_empleados:515,fecha_de_fundacion:"2007/10/17"},
    {nombre:"Aetheris",area:"Marketing",cantidad_de_empleados:15,fecha_de_fundacion:"2015/10/25"},
    {nombre:"Synthor",area:"Musica",cantidad_de_empleados:52,fecha_de_fundacion:"2000/10/21"}
])


//5

db.inventario.insertMany([
    {productos_fisicos:[{nombre: 'iphone 15', precio:1500},{nombre: 'iphone x', precio:200}],productos_digitales:[{nombre:"iCloud", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Samsung 15', precio:1500},{nombre: 'Samsung x', precio:200}],productos_digitales:[{nombre:"Drive", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Huawei 15', precio:1500},{nombre: 'Huawei x', precio:200}],productos_digitales:[{nombre:"Drive", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Laptop', precio:1500},{nombre: 'PC', precio:200}],productos_digitales:[{nombre:"Curso", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Tablet', precio:1500},{nombre: 'Telefono', precio:200}],productos_digitales:[{nombre:"Drive", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Botiquin', precio:1500},{nombre: 'Aspirinas', precio:200}],productos_digitales:[{nombre:"Curso de primeros auxilios", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Carro', precio:1500},{nombre: 'Motor', precio:200}],productos_digitales:[{nombre:"Autoescuela", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Inyeccion', precio:1500},{nombre: 'Vacuna', precio:200}],productos_digitales:[{nombre:"Curso de primeros auxilios", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Camara', precio:1500},{nombre: 'Tripode', precio:200}],productos_digitales:[{nombre:"Fotografias", precio:50}],inversion:600,venta:1750},
    {productos_fisicos:[{nombre: 'Guitarra', precio:1500},{nombre: 'Saxofon', precio:200}],productos_digitales:[{nombre:"Curso", precio:50}],inversion:600,venta:1750},
])

//6
db.usuarios.aggregate([
  {
    $match:{
        empresa: "Quixotex"
    }
  },
  {
    $lookup: {
      from: "empresas",
      localField: "empresa",
      foreignField: "nombre",
      as: "informacion_empresa"
    }
  },
  {
    $unwind: "$informacion_empresa"
  },
  {
    $project: {
      _id: 0,
      nombre_usuario: "$nombre",
      apellido_usuario: "$apellido",
      edad_usuario: "$edad",
      sexo_usuario: "$sexo",
      salario_usuario: "$salario",
      nombre_empresa: "$informacion_empresa.nombre",
      area_empresa: "$informacion_empresa.area",
      cantidad_empleados: "$informacion_empresa.cantidad_de_empleados",
      fecha_fundacion: "$informacion_empresa.fecha_de_fundacion"
    }
  }
])

//7

db.usuarios.aggregate([
  {
    $match: {
      edad: { $gt: 35 }
    }
  },
  {
    $addFields: {
      salario_con_bono: { $add: ["$salario", 250] }
    }
  }
])

//8

db.empresas.find({cantidad_de_empleados: {$gt:5}},{})

//9

db.usuarios.find({nombre: {$regex: /^E/}},{})

//10

db.usuarios.deleteMany({ edad: { $lt: 20 } },{$limit: 2})

db.usuarios.find()



