export const environment = {
  production: false,
  HOST_API: 'http://10.10.1.243:3004/',
  USER_APP: 'admin',
  PASS_APP: '827ccb0eea8a706c4c34a16891f84e7b',
  USER_CLI: '',
  PASS_CLI: '',
  ID_APP: 87,
  //ID_APP: 124,
  HOST_API_TOKEN: 'api-servicios/token/auth',
  API_USERS: 'http://10.10.1.243:3004/api-servicios/usuario/findAll',

  API_DINARP: 'http://10.10.1.243:3009/api_dinardap/',

  API_FIND_USER: 'http://10.10.1.243:3004/api-servicios/usuario/findByCedula/',
  API_FIND_PROFILE_BY_TOKEN: 'http://10.10.1.243:3004/api-servicios/perfil/findByToken',


  /**
   * CREAR APPS
   */
  API_ADD_APPS: 'http://10.10.1.243:3004/api-servicios/apps/create',
  API_DELETE_APPS:
    'http://10.10.1.243:3004/api-servicios/apps/updateEstadoByApliId/',
  API_EDIT_APPS: 'http://10.10.1.243:3004/api-servicios/apps/updateByApliId/',

  API_FIND_INFRA:
    'http://10.10.1.243:3004/api-servicios/infraestructura/findByApliId/',

  API_FIND_BY_APIID: 'http://10.10.1.243:3004/api-servicios/apps/findByApliId/',

  /**
   * APLICACIONES PERFILES
   */
  API_APPS_PROFILE_CREATE:
    'http://10.10.1.243:3004/api-servicios/aplicacion-perfiles/create',

  /**
   * USUARIOS
   */
  API_USERS_ALL: 'http://10.10.1.243:3004/api-servicios/usuario/findall',
  API_CREATE_USER: 'http://10.10.1.243:3004/api-servicios/usuario/crear',
  getDataByUsrId: 'http://10.10.1.243:3004/api-servicios/usuario/findByUsrId/',
  editDataByUsrId: 'http://10.10.1.243:3004/api-servicios/usuario/editByUsrId/',
  deleteDataByUsrId:
    'http://10.10.1.243:3004/api-servicios/usuario/desactivar/usuario-app',
  activeDataByUsrIdApliId:
    'http://10.10.1.243:3004/api-servicios/usuario/activar/usuario-app',
  getUserRecoveryPass: 'http://10.10.1.243:3004/api-servicios/usuario/recovery-pass/',
  getUserUpdatePass: 'http://10.10.1.243:3004/api-servicios/usuario/update-pass/',
  getUserRecoveryUsername: 'http://10.10.1.243:3004/api-servicios/usuario/update-pass/',  //consultar por el end point

  /**
   * PROVINCIA
   */
  API_PROV: 'http://10.10.1.243:3004/api-servicios/catalogo-ubicacion/findAll',

  /**
   * PROFILE
   */
  API_PROFILES_ALL:
    'http://10.10.1.243:3004/api-servicios/aplicacion-perfiles/findPerfilesByApliId/',

  API_GET_PROFILES: 'http://10.10.1.243:3004/api-servicios/perfil/findAll',

  API_DELETE_PROFILES:
    'http://10.10.1.243:3004/api-servicios/aplicacion-perfiles/updateEstadoPerfil',
  //Crear perfil
  API_CREATE_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/asignarPerfil',
  API_DELETE_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/quitarPerfil',

  FIND_APP_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/findByApliIdUsrId/',

  CREATE_ONLY_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/crearOnePerfil',

  EDIT_ONLY_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/updateByPflId/',

  DELETE_ONLY_PROFILE:
    'http://10.10.1.243:3004/api-servicios/perfil/updateEstadoByPflId/',

  /**
   * CATALOGOS
   */
  API_CATALOGOS: 'http://10.10.1.243:3006/api-catalogos/findByTipCatId/',

  /**
   * APLICACIONES
   */
  API_APPS_ALL: 'http://10.10.1.243:3004/api-servicios/apps/findAll',

  /**
   * EMAIL
   */

  API_EMAIL: 'http://10.10.1.243:3004/api-servicios/email/send-email',

  /**
   * MENUS
   */
  API_MENUS_ALL: 'http://10.10.1.243:3004/api-servicios/menus/findAll',

  API_MENUS_APP: 'http://10.10.1.243:3004/api-servicios/menus/findByApliId/',
  API_CREATE_MENU: 'http://10.10.1.243:3004/api-servicios/menus/create',
  API_CREATE_MENU_PRM:
    'http://10.10.1.243:3004/api-servicios/permisos/asignar-permiso',

  /**
   * INFRAESTRUCTURA
   */
  API_INFRA_ALL:
    'http://10.10.1.243:3004/api-servicios/infraestructura/findAll',
  API_INFRA_CREATE:
    'http://10.10.1.243:3004/api-servicios/infraestructura/create',
  API_INFRA_UPDATE:
    'http://10.10.1.243:3004/api-servicios/infraestructura/updateByInfraId/',
  API_INFRA_DELETE:
    'http://10.10.1.243:3004/api-servicios/infraestructura/updateEstadoByInfraId/',

  /**
   * PERMISOS
   */
  API_PERMIT_ALL: 'http://10.10.1.243:3004/api-servicios/permisos/findAll',
  API_PERMIT_CREATE: 'http://10.10.1.243:3004/api-servicios/permisos/create',
  API_PERMIT_UPDATE:
    'http://10.10.1.243:3004/api-servicios/permisos/updateByPrmId/',

  API_PERMIT_DELETE:
    'http://10.10.1.243:3004/api-servicios/permisos/updateEstadoByPrmId/',

  /**
   * PERFIL, APP Y PERMISO
   */

  API_PFL_APP_PRM_CREATE:
    'http://10.10.1.243:3004/api-servicios/permisos/asignar-permiso',

  API_PFL_APP_GET:
    'http://10.10.1.243:3004/api-servicios/permisos/findByPflIdByApliId/',


  /**
   * DASHBOARD Z1
   */
  API_DASHBOARD_INDICADOR: 'http://localhost:3023/api-renagro/indicador/find',
  API_DASHBOARD_LUGAR: 'http://localhost:3023/api-renagro/lugar/find',
  API_DASHBOARD_VALOR: 'http://localhost:3023/api-renagro/valor/find',
  API_DASHBOARD_META: 'http://localhost:3023/api-renagro/meta/find',
  API_DASHBOARD_AVANCE: 'http://localhost:3023/api-renagro/avance/find',
};

