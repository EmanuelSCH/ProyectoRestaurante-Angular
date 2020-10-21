using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.web.Clases;
using angular.web.Models;
using System.Security.Cryptography.X509Certificates;
using System.Transactions;
using System.Diagnostics;

namespace angular.web.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarTipoUsuarios")]
        public List<TipoUsuarioCLS> listarTipoUsuarios()
        {
            List<TipoUsuarioCLS> listaTipoUsuario = new List<TipoUsuarioCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                    where tipoUsuario.Bhabilitado == 1
                                    select new TipoUsuarioCLS
                                    {
                                        iidtipousuario = tipoUsuario.Iidtipousuario,
                                        nombre = tipoUsuario.Nombre,
                                        descripcion = tipoUsuario.Descripcion,
                                        bhabilitado = (int)tipoUsuario.Bhabilitado
                                    }).ToList();

                return listaTipoUsuario;

            }

        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasTipoUsuario")]
        public List<PaginaCLS> listarPaginasTipoUsuario()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            using (BDRestauranteContext bd=new BDRestauranteContext())
            {

                listaPagina = (from pagina in bd.Pagina
                               where pagina.Bhabilitado == 1
                               select new PaginaCLS
                               {

                                   iidpagina = pagina.Iidpagina,
                                   mensaje = pagina.Mensaje

                               }).ToList();

            }

            return listaPagina;

        }

        [HttpPost]
        [Route("api/TipoUsuario/guardarDatosTipoUsuario")]
        public int guardarDatosTipoUsuario([FromBody] TipoUsuarioCLS oTipoUsuarioCLS)
        {

            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using(var transaccion = new TransactionScope())
                    {
                        if (oTipoUsuarioCLS.iidtipousuario == 0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            oTipoUsuario.Bhabilitado = oTipoUsuarioCLS.bhabilitado;
                            bd.TipoUsuario.Add(oTipoUsuario);

                            int idTipoUsuario = oTipoUsuario.Iidtipousuario;
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            for (int i = 0; i < ids.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idTipoUsuario;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);

                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }


                        else
                        {
                            TipoUsuario oTipousuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.iidtipousuario).First();
                            oTipousuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipousuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            bd.SaveChanges();
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");

                            List<PaginaTipoUsuario> lista = bd.PaginaTipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.iidtipousuario).ToList();
                            foreach(PaginaTipoUsuario pag in lista)
                            {

                                pag.Bhabilitado = 0;

                            }

                            int cantidad;
                            for (int i = 0; i < ids.Length; i++)
                            {
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();                   

                                if (cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.iidtipousuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);


                                }
                                else
                                {
                                    PaginaTipoUsuario oP = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).First();
                                    oP.Bhabilitado = 1;

                                }
                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;


                        }
                    }
                }


            }catch(Exception ex)
            {
                ex.ToString();
                rpta = 0;
            }

            return rpta;

        }

        [HttpGet]
        [Route("api/TipoUsuario/eliminarTipoUsuario/{iidTipoUsuario}")]
        public int eliminarTipoUsuario (int iidTipoUsuario)
        {

            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == iidTipoUsuario).First();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }


            }catch (Exception Ex)
            {
                Ex.ToString();
                rpta = 0;
            }

            return rpta;

        }


        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar/{iidTipoUsuario}")]
        public TipoUsuarioCLS listarPaginasRecuperar(int iidTipoUsuario)
        {

            TipoUsuarioCLS oTipoUsuarioCLS = new TipoUsuarioCLS();
            using (BDRestauranteContext bd= new BDRestauranteContext())
            {
                List<PaginaCLS> listaPaginas = (from tipoUsuario in bd.TipoUsuario
                                                join paginaTipoUsu in bd.PaginaTipoUsuario
                                                on tipoUsuario.Iidtipousuario equals
                                                paginaTipoUsu.Iidtipousuario
                                                join pagina in bd.Pagina
                                                on paginaTipoUsu.Iidpagina equals
                                                pagina.Iidpagina
                                                where paginaTipoUsu.Iidtipousuario == iidTipoUsuario
                                                && paginaTipoUsu.Bhabilitado == 1
                                                select new PaginaCLS
                                                {
                                                    iidpagina = pagina.Iidpagina
                                                }).ToList();

                TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == iidTipoUsuario).First();

                oTipoUsuarioCLS.iidtipousuario = oTipoUsuario.Iidtipousuario;
                oTipoUsuarioCLS.nombre = oTipoUsuario.Nombre;
                oTipoUsuarioCLS.descripcion = oTipoUsuario.Descripcion;
                oTipoUsuarioCLS.listaPagina = listaPaginas;


                return oTipoUsuarioCLS;

            }






            



        }

    }

   
}