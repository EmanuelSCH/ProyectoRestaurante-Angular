using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.web.Clases
{
    public class TipoUsuarioCLS
    {
        public int iidtipousuario { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int bhabilitado { get; set; }
        public string valores { get; set; }
        public List<PaginaCLS> listaPagina { get; set; }
    }
}
