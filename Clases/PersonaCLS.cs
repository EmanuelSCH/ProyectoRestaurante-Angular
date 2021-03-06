﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.web.Clases
{
    public class PersonaCLS
    {
        public int iidpersona { get; set; }

        public string nombreCompleto { get; set; }

        public string telefono { get; set; }

        public string correo { get; set; }

        public DateTime fechaNacimiento { get; set; }

        public int? bhabilitado { get; set; }

        //Propiedades adicionales
        public string nombre { get; set; }
        public string apPaterno { get; set; }
        public string apMaterno { get; set; }

        public string fechaCadena { get; set; }
    }
}
