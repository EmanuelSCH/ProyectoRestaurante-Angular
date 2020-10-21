using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.web.Models;
using angular.web.Clases;

namespace angular.web.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/persona/listarPersonas")]

        public IEnumerable<PersonaCLS> listarPersonas()
        {

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                 where persona.Bhabilitado == 1
                                                 select new PersonaCLS
                                                 {
                                                     iidpersona = persona.Iidpersona,
                                                     nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     telefono = persona.Telefono,
                                                     correo = persona.Correo

                                                 }).ToList();
                return listaPersona;
            }

        }


        [HttpGet]
        [Route("api/persona/filtrarPersona/{nombreCompleto?}")]
        public IEnumerable<PersonaCLS> filtrarPersona(string nombreCompleto = "")
        {
            List<PersonaCLS> listaPersona;

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                if (nombreCompleto == "")
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        telefono = persona.Telefono,
                                        correo = persona.Correo

                                    }).ToList();
                }
                else
                {

                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToLower().Contains(nombreCompleto.ToLower())
                                    select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        telefono = persona.Telefono,
                                        correo = persona.Correo

                                    }).ToList();
                }

                return listaPersona;
            }

        }

        [HttpGet]
        [Route("api/persona/listarPersonaCombo")]
        public IEnumerable<PersonaCLS>  listarPersonaCombo()
        {

            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                IEnumerable<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                        where persona.Bhabilitado == 1
                                                        && persona.Btieneusuario == 0
                                                        select new PersonaCLS
                                                        {
                                                              iidpersona = persona.Iidpersona,
                                                              nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno
                                                        }).ToList();
                return listaPersona;

            }


        }

        [HttpPost]
        [Route("api/Persona/guardarPersona")]
        public int guardarPersona([FromBody] PersonaCLS oPersonaCLS)
        {
            int rpta = 0;

            try
            {

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPersonaCLS.iidpersona == 0)
                    {
                        Persona oPersona = new Persona();

                        oPersona.Iidpersona = oPersonaCLS.iidpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Bhabilitado = 1;
                        oPersona.Btieneusuario = 0;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {

                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oPersonaCLS.iidpersona).First();
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        oPersona.Bhabilitado = 1;
                        bd.SaveChanges();
                        rpta = 1;

                    }
                    

                }
            }
            catch (Exception ex)
            {
                ex.ToString();
                rpta = 0;
            }
            return rpta;
        }
            [HttpGet]
            [Route("api/Persona/validarCorreo/{id}/{correo}")]
            public int validarCorreo (int id, string correo)
            {
            int rpta = 0;
               try
               {

                using(BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0)
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower() && p.Iidpersona!=id).Count();
                    }
                }


               }
               catch(Exception ex)
               {

                ex.ToString();
                rpta = 0;

               }

            return rpta;

            }

            [HttpGet]
            [Route("api/Persona/recuperarPersona/{idPersona}")]
            public PersonaCLS recuperarPersona (int idPersona)
            {

                using (BDRestauranteContext bd=new BDRestauranteContext())
                {

                PersonaCLS oPersonaCLS = (from persona in bd.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Iidpersona == idPersona
                                          select new PersonaCLS
                                          {
                                              iidpersona = persona.Iidpersona,
                                              nombre = persona.Nombre,
                                              apPaterno = persona.Appaterno,
                                              apMaterno = persona.Apmaterno,
                                              telefono = persona.Telefono,
                                              correo = persona.Correo,
                                              fechaCadena = persona.Fechanacimiento!=null ? ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd") : ""

                                          }).First();

                return oPersonaCLS;

                }


            }

        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idPersona}")]
        public int eliminarPersona(int idPersona)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    Persona oPersona = bd.Persona.Where(p => p.Iidpersona == idPersona).First();
                    oPersona.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }

            }
            catch(Exception ex)
            {
                ex.ToString();
                rpta = 0;
            }

            return rpta;

        }


        }

    }
